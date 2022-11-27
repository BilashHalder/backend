const { add, update, find, findall, remove, isRegister } = require("./employee.services");
const { imageValidation, imageUpload } = require('../../util/lib');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const Add_ = async (request, response) => {
  let { name,gender,email,phone} = request.body;
  if (name == undefined || gender == undefined || email == undefined || phone == undefined)
    response.status(404).json({ message: "Invalid request" });
  else if (request.files == null)
    response.status(404).json({ message: "Invalid request" });
  else if (request.files.image == undefined)
    response.status(404).json({ message: "Invalid request" });
  else {
    let img = request.files.image;
    let obj = { name,gender,email,phone };
    obj.balance = 0;
    obj.pass = bcrypt.hashSync('123456', saltRounds);
    obj.status = 1;
    if (!imageValidation(img))
      response.status(400).json({ message: "Invalid Image" });
    else {
      let fu = await imageUpload(img);
      if (!fu) {
        response.status(500).json({ message: "Internal Server Error" });
      }
      else {
        obj.img = fu;
        isRegister(obj, (err, result) => {
          if (err)
            response.status(500).json({ message: err });
          else if (result.length)
            response.status(400).json({ message: "Email or Phone No Already Registerd" });
          else {
            add(obj, (err, result) => {
              if (err)
                response.status(500).json({ message: "Internal Server Error" });
              else
                response.status(201).json({ message: "Employee Added successfully", data: result });
            });
          }
        });
      }
    }
  }
}




const Update_ = (request, response) => {
  let errmsg = null;
  if (isNaN(request.params.id))
    response.status(400).json({ message: "Invalid Request" });
  else {
    find(request.params.id, async (err, result) => {
      if (err)
        response.status(500).json({ message: "Internal Server Error " });
      else if (result.length == 0)
        response.status(404).json({ message: "Invalid request" });
      else {
        let oldData = result;
        let newData = request.body;
//name, gender,email,phone,balance,pass,image,status

        if (newData.name != undefined && newData.name != oldData.name)
          oldData = { ...oldData, name: newData.name };

        if (newData.gender != undefined && newData.gender != oldData.gender)
          oldData = { ...oldData, gender: newData.gender }

        if (newData.email != undefined && newData.email != oldData.email)
          oldData = { ...oldData, email: newData.email }

        if (newData.phone != undefined && newData.phone != oldData.phone)
          oldData = { ...oldData, phone: newData.phone }

        if (newData.status != undefined && newData.status != oldData.status)
          oldData = { ...oldData, status: parseInt(newData.status) }

        if (request.files && request.files.image) {
          let img = request.files.image;
          if (!imageValidation(img))
            errmsg = 'Invalid Image';
          let fu = await imageUpload(img);
          if (!fu)
            errmsg = "Internal Server Error";
          else
            oldData = { ...oldData, image: fu }
        }

        if (newData.newpass != undefined && newData.pass != undefined) {
          let passval = bcrypt.compareSync(newData.pass, oldData.pass);
          if (passval)
            oldData = { ...oldData, pass: bcrypt.hashSync(newData.newpass, saltRounds) }
          else
            errmsg = "Invalid Old Password";
        }


        if (errmsg) {
          response.status(400).json({ message: errmsg });
        }
        else {
          update(oldData, (err, result) => {
            if (err)
              response.status(500).json({ message: "Internal Server Error" });
            else if (result.affectedRows == 0)
              response.status(406).json({ message: "Invalid Data" });
            else
              response.status(200).json({ message: "Data Updated Successfully", data: oldData });
          });
        }
      }
    });
  }
};



const Find_ = (request, response) => {
  let _id = request.params.id;
  if (isNaN(_id)) response.status(400).json({ message: "Invalid Request" });
  else {
    find(_id, (err, result) => {
      if (err) response.status(500).json({ message: "Internal Server Error" });
      else if (!result)
        response.status(404).json({ message: "No data found" });
      else response.status(200).json(result);
    });
  }
};



const FindAll_ = (request, response) => {
  findall(null, (err, result) => {
    if (err) response.status(500).json({ message: "Internal Server Error" });
    else if (result.length == 0)
      response.status(404).json({ message: "No data found" });
    else response.status(200).json(result);
  });
};



const Remove_ = (request, response) => {
  let _id = request.params.id;
  if (isNaN(_id)) response.status(400).json({ message: "Invalid Request" });
  else {
    remove(_id, (err, result) => {
      if (err) response.status(500).json({ message: "Internal Server Error" });
      else if (result.affectedRows == 0)
        response.status(406).json({ message: "No Data Found" });
      else response.status(200).json({ message: "Data Deleted Successfully" });
    });
  }
};



const Verify=(request, response)=>{
  const{email_phone,pass}=request.body;
  if(email_phone==undefined || pass==undefined)
    response.status(400).json({ message: "Invalid Username or Password b"});
    else{
      let obj={email:email_phone,phone:email_phone}
      isRegister(obj, (err, result) => {
        if (err)
          response.status(500).json({ message: "Internal Server Error"});
        else if (result.length==0)
        response.status(400).json({ message: "Invalid Username or Password"});
        else {
          let passval = bcrypt.compareSync(pass,result[0].pass);
          if(!passval)
          response.status(400).json({ message: "Invalid Username or Password"});
          else
            response.status(200).json({ message: "verified",token:'token'});
        }
      });
    }

}


module.exports = { Find_, FindAll_, Add_, Update_, Remove_ ,Verify};
