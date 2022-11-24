const { add, update, find, findall, remove ,user } = require("./payment.services");
const {servererror,invalidrequest,updatemessge,datanotfound,deletemsg,imageerror,alreadyused,passerror,invaliddata,invalid}=require('../../locale/en');





const Add_ = (request, response) => {
let {payment_mode,transaction_id,ammount,status,to_account,from_account, remarks}=request.body;
if(!(payment_mode)||!(transaction_id)||!(ammount)||!(status)||!(to_account)||!(from_account)||!(remarks))
response.status(400).json({ message: invalidrequest });
  let data = request.body;
  add(data,(err,result)=>{
  if (err) 
  response.status(500).json({ message: servererror });
  else
  response.status(200).json(result);
 });
 
};




const Update_ = (request, response) => {
  if (isNaN(request.params.id))
    response.status(400).json({ message: invalidrequest });
  else {
    find(request.params.id, (err, result) => {
      if (err) 
      response.status(500).json({ message: servererror });
      else if (result.length == 0)
        response.status(404).json({ message: invalidrequest });
      else {
        let newData=request.body;
        let oldData=result;

        if (newData.payment_mode != undefined && newData.payment_mode != oldData.payment_mode)
        oldData = { ...oldData, payment_mode: newData.payment_mode };

        if (newData.transaction_id != undefined && newData.transaction_id != oldData.transaction_id)
        oldData = { ...oldData, transaction_id: newData.transaction_id };

        if (newData.ammount != undefined && newData.ammount != oldData.ammount)
        oldData = { ...oldData, ammount: newData.ammount };

        if (newData.status != undefined && newData.status != oldData.status)
        oldData = { ...oldData, status: newData.status };

        if (newData.to_account != undefined && newData.to_account != oldData.to_account)
        oldData = { ...oldData, to_account: newData.to_account };

        if (newData.from_account != undefined && newData.from_account != oldData.from_account)
        oldData = { ...oldData, from_account: newData.from_account };

        if (newData.remarks != undefined && newData.remarks != oldData.remarks)
        oldData = { ...oldData, remarks: newData.remarks };

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
  if (isNaN(_id)) response.status(400).json({ message: invalidrequest});
  else {
    find(_id, (err, result) => {
      if (err) response.status(500).json({ message: servererror });
      else if (result.length == 0)
        response.status(404).json({ message: datanotfound });
      else response.status(200).json(result);
    });
  }
};





const FindAll_ = (request, response) => {
  findall(null, (err, result) => {
    if (err) response.status(500).json({ message: servererror});
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

const Users_ = (request, response) => {
  const {user_id,user_type} = request.body;

  if (!user_id || !user_type)
   response.status(400).json({ message: invalidrequest});
  else {
    let _id=`${user_id}_${user_type}`;
    console.log(_id)
    user(_id, (err, result) => {
      if (err) response.status(500).json({ message: servererror });
      else if (result.length == 0)
        response.status(404).json({ message: datanotfound });
      else response.status(200).json(result);
    });
  }
};

module.exports = { Find_, FindAll_, Add_, Update_, Remove_ ,Users_};
