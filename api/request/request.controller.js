const { add, update, find, findall, remove } = require("./request.services");
const {servererror,invalidrequest,updatemessge,datanotfound,deletemsg,imageerror,alreadyused,passerror,invaliddata,invalid}=require('../../locale/en');



const Add_ = (request, response) => {

  let {name, subject, message, email,phone, request_type }=request.body;

  if(!(name)||!(phone_no)||!(subject)||!(message) || !email || !phone || !request_type)
  response.status(404).json({ message: invalidrequest });
  else{
  add(request.body,(err,result)=>{
    if (err) 
    response.status(500).json({ message: servererror });
    else
    response.status(200).json(result);
   });
} 
};




const Update_ = (request, response) => {
  if (isNaN(request.params.id))
    response.status(400).json({ message: invalidrequest });
  else {
    find(request.params.id, (err, result) => {
      if (err) 
      response.status(500).json({ message: servererror });
      else if (!result)
        response.status(404).json({ message: invalidrequest });
      else {
        let newData=request.body;
        let oldData=result;


//,,,,,remarks,,

        if(newData.name!=undefined && newData.name!=oldData.name)
        oldData={...oldData,name:newData.name};

        if(newData.phone!=undefined && newData.phone!=oldData.phone)
        oldData={...oldData,phone:newData.phone};

        if(newData.email!=undefined && newData.email!=oldData.email)
        oldData={...oldData,email:newData.email};

        if(newData.subject!=undefined && newData.subject!=oldData.subject)
        oldData={...oldData,subject:newData.subject};


        if(newData.message!=undefined && newData.message!=oldData.message)
        oldData={...oldData,message:newData.message};

        if(newData.status!=undefined && newData.status!=oldData.status)
        oldData={...oldData,status:newData.status};

        if(newData.request_type!=undefined && newData.request_type!=oldData.request_type)
        oldData={...oldData,request_type:newData.request_type};

        if(newData.remarks!=undefined && newData.remarks!=oldData.remarks)
        oldData={...oldData,remarks:newData.remarks};

        update(oldData,(err, result) => {
          if (err)
            response.status(500).json({ message: servererror });
          else if (result.affectedRows == 0)
            response.status(406).json({ message: datanotfound });
          else
            response.status(200).json({ message: updatemessge });
        });
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
    if (err) response.status(500).json({ message: err });
    else if (result.length == 0)
      response.status(404).json({ message: datanotfound});
    else response.status(200).json(result);
  });
};




const Remove_ = (request, response) => {
  let _id = request.params.id;
  if (isNaN(_id)) response.status(400).json({ message: invalidrequest });
  else {
    remove(_id, (err, result) => {
      if (err) {response.status(500).json({ message: servererror });}
      else if (result.affectedRows == 0)
        response.status(406).json({ message: datanotfound });
      else response.status(200).json({ message: updatemessge });
    });
  }
};
module.exports = { Find_, FindAll_, Add_, Update_, Remove_ };
