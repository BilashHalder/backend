const { add, update, find, findall, remove, isRegister,refHistory } = require("./associate.services");
const { imageValidation, imageUpload } = require('../../util/lib');
const {servererror,invalidrequest,updatemessge,datanotfound,deletemsg,imageerror,alreadyused,passerror,invaliddata,invalid}=require('../../locale/en');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Add_ = async (request, response) => {
  let { name,gender,email,commission_rate,employee_id,phone } = request.body;
  if (name == undefined || gender == undefined || email == undefined ||commission_rate==undefined||employee_id==undefined|| phone == undefined || referred_by == undefined)
    response.status(404).json({ message: invalidrequest });
  else if (request.files == null)
    response.status(404).json({ message: invalidrequest });
  else if (request.files.image == undefined)
    response.status(404).json({ message: invalidrequest });
  else {
    let img = request.files.image;
    let obj = { name,gender,email,commission_rate,employee_id,phone };
    obj.balance = 0;
    obj.pass = bcrypt.hashSync('123456', saltRounds);
    obj.status = 1;
    if (!imageValidation(img))
      response.status(400).json({ message: imageerror });
    else {
      let fu = await imageUpload(img);
      if (!fu) {
        response.status(500).json({ message: servererror });
      }
      else {
        obj.img = fu;
        isRegister(obj, (err, result) => {
          if (err)
            response.status(500).json({ message: err });
          else if (result.length)
            response.status(400).json({ message: alreadyused });
          else {
            add(obj, (err, result) => {
              if (err)
                response.status(500).json({ message: servererror });
              else
                response.status(201).json({ message: "Associate Added successfully", data: result });
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
    response.status(400).json({ message: invalidrequest });
  else {
    find(request.params.id, async (err, result) => {
      if (err)
        response.status(500).json({ message: servererror });
      else if (result.length == 0)
        response.status(404).json({ message: invalidrequest });
      else {
        let oldData = result;
        let newData = request.body;


        if (newData.name != undefined && newData.name != oldData.name)
          oldData = { ...oldData, name: newData.name };

        if (newData.gender != undefined && newData.gender != oldData.gender)
          oldData = { ...oldData, gender: newData.gender }

        if (newData.email != undefined && newData.email != oldData.email)
          oldData = { ...oldData, email: newData.email }

          if (newData.commission_rate != undefined && newData.commission_rate != oldData.commission_rate)
          oldData = { ...oldData, commission_rate: newData.commission_rate }

          if (newData.employee_id != undefined && newData.employee_id != oldData.employee_id)
          oldData = { ...oldData, employee_id: newData.employee_id }

        if (newData.phone != undefined && newData.phone != oldData.phone)
          oldData = { ...oldData, phone: newData.phone }
        if (newData.status != undefined && newData.status != oldData.status)
          oldData = { ...oldData, status: parseInt(newData.status) }
        if (newData.referred_by != undefined && newData.referred_by != oldData.referred_by)
          oldData = { ...oldData, referred_by: newData.referred_by }

        if (request.files && request.files.image) {
          let img = request.files.image;
          if (!imageValidation(img))
            errmsg = imageerror;
          let fu = await imageUpload(img);
          if (!fu)
            errmsg = servererror;
          else
            oldData = { ...oldData, image: fu }
        }

        if (newData.newpass != undefined && newData.pass != undefined) {
          let passval = bcrypt.compareSync(newData.pass, oldData.pass);
          if (passval)
            oldData = { ...oldData, pass: bcrypt.hashSync(newData.newpass, saltRounds) }
          else
            errmsg = passerror;
        }


        if (errmsg) {
          response.status(400).json({ message: errmsg });
        }
        else {
          update(oldData, (err, result) => {
            if (err)
              response.status(500).json({ message: servererror });
            else if (result.affectedRows == 0)
              response.status(406).json({ message: invaliddata });
            else
              response.status(200).json({ message: updatemessge, data: oldData });
          });
        }
      }
    });
  }
};



const Find_ = (request, response) => {
  let _id = request.params.id;
  if (isNaN(_id)) response.status(400).json({ message: invalidrequest });
  else {
    find(_id, (err, result) => {
      if (err) response.status(500).json({ message: servererror });
      else if (!result)
        response.status(404).json({ message: datanotfound });
      else response.status(200).json(result);
    });
  }
};



const FindAll_ = (request, response) => {
  findall(null, (err, result) => {
    if (err) response.status(500).json({ message: servererror });
    else if (result.length == 0)
      response.status(404).json({ message: datanotfound });
    else response.status(200).json(result);
  });
};



const Remove_ = (request, response) => {
  let _id = request.params.id;
  if (isNaN(_id)) response.status(400).json({ message: invalidrequest });
  else {
    remove(_id, (err, result) => {
      if (err) response.status(500).json({ message: servererror });
      else if (result.affectedRows == 0)
        response.status(406).json({ message: datanotfound });
      else response.status(200).json({ message: deletemsg });
    });
  }
};



const Referaal=(request, response)=>{

  refHistory(request.params.id, (err, result) => {
      if (err) response.status(500).json({ message: servererror });
      else if (!result)
        response.status(404).json({ message: datanotfound });
      else response.status(200).json(result);
    });


}


module.exports = { Find_, FindAll_, Add_, Update_, Remove_ ,Referaal};
