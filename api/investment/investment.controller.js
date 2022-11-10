const { add, update, find, findall, remove } = require("./investment.services");
const dbcon = require("../../config/dbconfig");
const{pdfValidation,pdfUpload}=require('../../util/lib')


const {servererror,invalidrequest,updatemessge,datanotfound,deletemsg,imageerror,alreadyused,passerror,invaliddata,invalid}=require('../../locale/en');




const Add_ = async(request, response) => {
  const {user_id,user_type,ammount,roi,nominee_id,account_no,is_send}=request.body;

if(!(user_id)||!(user_type)||!(ammount)||!(roi)||!(nominee_id)||!(account_no)||!(is_send))
  response.status(404).json({ message: invalidrequest });
else{
  if(user_type==1){
    qurUpdate='UPDATE customer SET balance=455 WHERE id';
    qur='SELECT * FROM customer WHERE id=?';
  }
    
    else if(user_type==2)
   {
    qurUpdate='UPDATE associate SET balance=455 WHERE id';
    qur='SELECT * FROM associate WHERE id=?'
   }
    else 
    { qurUpdate='UPDATE associate SET balance=455 WHERE id';
      qur='SELECT * FROM employee WHERE id=?'
    }

    dbcon.query(qur,[user_id],async (err, result, fields) => {
      if(err)
          response.status(500).json({ message: "Internal Server Error " });
      else if(!result)
           response.status(400).json({ message: "Invalid Requset" });
      else if(parseFloat(result[0].balance) < parseFloat(ammount))
              response.status(400).json({ message: "Insufficient Balance" });
      else
       {
        //create payment 
        //update balance
        //payment_mode,transaction_id,ammount,status,to_account, from_account,remark


        let temp={user_id,user_type,ammount,roi,nominee_id,account_no,is_send,payment_id:Math.random()*1000000000,agreement_file:null,status:1,withdrw_req_time:null}
       
       
        add(temp, (err, result) => {
          if (err)
            response.status(500).json({ message: servererror });
          else
            response.status(201).json({ message: "Invesment Added", data: result });
        });



       }
    });
}


//check balance 
//deduct balance
//add in invesment
  




 


 









 
};




const Update_ = (request, response) => {
  

  if (isNaN(request.params.id))
    response.status(400).json({ message: "Invalid Request" });
  else {
    find(request.params.id, (err, result) => {
      if (err) 
      response.status(500).json({ message: "Internal Server Error " });
      else if (result.length == 0)
        response.status(404).json({ message: "Invalid request" });
      else {
        let newData=request.body;
        let oldData=result;

        if (newData.user_id != undefined && newData.user_id != oldData.user_id)
          oldData = { ...oldData, user_id: newData.user_id };

          if (newData.user_type != undefined && newData.user_type != oldData.user_type)
          oldData = { ...oldData, user_type: newData.user_type };

          if (newData.ammount != undefined && newData.ammount != oldData.ammount)
          oldData = { ...oldData, ammount: newData.ammount };

          if (newData.roi != undefined && newData.roi != oldData.roi)
          oldData = { ...oldData, roi: newData.roi };

          if (newData.nominee_id != undefined && newData.nominee_id != oldData.nominee_id)
          oldData = { ...oldData, nominee_id: newData.nominee_id };

          if (newData.account_no != undefined && newData.account_no != oldData.account_no)
          oldData = { ...oldData, account_no: newData.account_no };

          if (newData.payment_id != undefined && newData.payment_id != oldData.payment_id)
          oldData = { ...oldData, payment_id: newData.payment_id };

          if (newData.status != undefined && newData.status != oldData.status)
          oldData = { ...oldData, status: newData.status };

          if (newData.withdrw_req_time != undefined && newData.withdrw_req_time != oldData.withdrw_req_time)
          oldData = { ...oldData, withdrw_req_time: newData.withdrw_req_time };

          if (newData.is_send != undefined && newData.is_send != oldData.is_send)
          oldData = { ...oldData, is_send: newData.is_send };
         
          if(request.files && request.files.agreement_file)
          {
              if(!pdfValidation(request.files.agreement_file))
              response.status(406).json({ message: "Invalid File" });
              else{
                let fname=pdfUpload(request.files.agreement_file);
                oldData = { ...oldData, agreement_file: fname };
              }

          }
        update(oldData,(err, result) => {
          if (err)
            response.status(500).json({ message: "Internal Server Error" });
          else if (result.affectedRows == 0)
            response.status(406).json({ message: "No Data Found" });
          else
            response.status(200).json({ message: "Data Updated Successfully" });
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
    else if (!result)
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
