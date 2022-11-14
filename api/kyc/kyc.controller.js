const { add, update, find, findall, remove ,findKyc} = require("./kyc.services");
const {servererror,invalidrequest,updatemessge,datanotfound,deletemsg,imageerror,alreadyused,passerror,invaliddata,invalid}=require('../../locale/en');




const Add_ = (request, response) => {

  let {adhar_no,pan_no,address,user_id,user_type}=request.body;

  if(!(adhar_no)||!(pan_no)||!(address)||!(user_id)||!(user_type))
  response.status(404).json({ message: invalidrequest });
else{

  findKyc({user_id,user_type},(err,info,fields)=>{
    if (err) 
    response.status(500).json({ message: servererror });
    else if(info){
      response.status(400).json({ message: 'Kyc Already Added' });
    }
    else{
 /**  
   * Call Adhar & Pan api and set the verfication fields
   * **/

  let data={adhar_no,pan_no,address,user_id,user_type,adhar_verified:1,pan_verified:1}
  add(data,(err,result)=>{
    if (err) 
    response.status(500).json({ message: servererror });
    else
    response.status(200).json(result);
   });
    }
  });
}
};




const Update_ = (request, response) => {
  
  if (isNaN(request.params.id))
    response.status(400).json({ message:invalidrequest});
  else {
    find(request.params.id, (err, result) => {
      if (err) 
      response.status(500).json({ message: servererror });
      else if (!result)
        response.status(404).json({ message: invalidrequest });
      else {
        let newData=request.body;
        let oldData=result;
    
        if (newData.adhar_no != undefined && newData.adhar_no != oldData.adhar_no)
        oldData = { ...oldData, adhar_no: newData.adhar_no };

        if (newData.pan_no != undefined && newData.pan_no != oldData.pan_no)
        oldData = { ...oldData, pan_no: newData.pan_no };

        if (newData.address != undefined && newData.address != oldData.address)
        oldData = { ...oldData, address: newData.address };

        if (newData.pan_verified != undefined && newData.pan_verified != oldData.pan_verified)
        oldData = { ...oldData, pan_verified: newData.pan_verified };

        if (newData.adhar_verified != undefined && newData.adhar_verified != oldData.adhar_verified)
        oldData = { ...oldData, adhar_verified: newData.adhar_verified };

        if (newData.user_id != undefined && newData.user_id != oldData.user_id)
        oldData = { ...oldData, user_id: newData.user_id };

        if (newData.user_type != undefined && newData.user_type != oldData.user_type)
        oldData = { ...oldData, user_type: newData.user_type };

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
module.exports = { Find_, FindAll_, Add_, Update_, Remove_ };
