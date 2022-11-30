const { add,update,find,findall,remove,userDeposit,refIsExist } = require("./deposit.services");
const { imageValidation, imageUpload } = require('../../util/lib');
const dbcon=require('../../config/dbconfig')
//mode, doc, reference, remarks, amount, user_id, user_type



const Add_ = async(request, response) => {
  const{mode, doc, reference, amount, user_id, user_type}=request.body;
  if(mode==undefined || reference==undefined ||amount==undefined || user_id==undefined || user_type==undefined )
  response.status(400).json({ message: "Invalid Request" });
  else{
    let data={mode, reference,user_type,user_id,amount,status:0}
    refIsExist(reference,(err,result)=>{
      if (err) 
      response.status(500).json({ message: "Internal Server Error" });
      else if(result){
        response.status(400).json({ message: "Transaction Reference Already Used" });
      }
      else{
          if(request.files && request.files.doc){
            let fu = imageUpload(request.files.doc);
            if (!fu) {
              response.status(500).json({ message: servererror });
            }
            data.doc=fu;
          }
          else
          data.doc="";
        add(data,(err,result)=>{
          if (err) 
          response.status(500).json({ message: "Internal Server Error" });
          else
          response.status(200).json(result);
         });
      }
    });
  }
};




const Update_ = (request, response) => {
  let {user_id,user_type,remarks,status,amount}=request.body;
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

        if(newData.user_id!=undefined && newData.user_id!=oldData.user_id)
        oldData={...oldData,user_id:newData.user_id};

        if(newData.user_type!=undefined && newData.user_type!=oldData.user_type)
        oldData={...oldData,user_type:newData.user_type};

        if(newData.remarks!=undefined && newData.remarks!=oldData.remarks)
        oldData={...oldData,remarks:newData.remarks};

        if(newData.amount!=undefined && newData.amount!=oldData.amount)
        oldData={...oldData,amount:newData.amount};

        if(newData.status!=undefined && newData.status!=oldData.status)
        oldData={...oldData,status:newData.status};
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

const UserDeposit_ = (request, response) => {
  let {user_id,user_type}=request.body;
  if(user_id==undefined || user_type==undefined)
      response.status(400).json({ message: "Invalid Request" });
  else{
    userDeposit(request.body, (err, result) => {
          if (err) response.status(500).json({ message: "Internal Server Error" });
          else if (result.length == 0)
            response.status(404).json({ message: "No data found" });
          else response.status(200).json(result);
        });
  }  
};

const AcceptPayment_=(request, response)=>{
const {id,user_id,user_type,amount}=request.body;
if(id==undefined|| user_id==undefined || user_type==undefined || amount==undefined)
      response.status(400).json({ message: "Invalid Request" });
else{
  let updateStatQuery="UPDATE deposit SET status=1 WHERE id=?"
  if(user_type==1)
  {
    let findquery="SELECT * FROM customer WHERE id=?";
    let updateQuery="UPDATE customer SET balance=? WHERE id=?";
    dbcon.query(findquery,[user_id],(err,result,fields)=>{
     
      if(err)
      response.status(400).json(err);
      else if(!result)
      response.status(400).json(err);
      else 
      {
        let newbal=parseFloat(result[0].balance)+parseFloat(amount);
        dbcon.query(updateQuery,[newbal,user_id],(err,result,fields)=>{
          if(err)
          response.status(400).json(err);
          else{
            dbcon.query(updateStatQuery,[id],(err,result,fields)=>{
              if(err)
              response.status(400).json(err);
              else{
                response.status(200).json({message:"balance Updated"}); 
              }
            }); 
          }
        });
      }

    })

  }
  else if(user_type==2){
    let findquery="SELECT * FROM associate WHERE id=?";
    let updateQuery="UPDATE associate SET balance=? WHERE id=?";
    dbcon.query(findquery,[user_id],(err,result,fields)=>{
     
      if(err)
      response.status(400).json(err);
      else if(!result)
      response.status(400).json(err);
      else 
      {
        let newbal=parseFloat(result[0].balance)+parseFloat(amount);
        dbcon.query(updateQuery,[newbal,user_id],(err,result,fields)=>{
          if(err)
          response.status(400).json(err);
          else{
            dbcon.query(updateStatQuery,[id],(err,result,fields)=>{
              if(err)
              response.status(400).json(err);
              else{
                response.status(200).json({message:"balance Updated"}); 
              }
            });
            
          }
        });
      }

    })
  }
  else response.status(400).json({ message: "Invalid User Type" });
}
}

const RejectPayment_=(request, response)=>{
  const {id,remarks}=request.body;
  
  if(!id || !remarks)
        response.status(400).json({ message: "Invalid Request" });
  else{
    let updateQuery="UPDATE deposit SET status=2,remarks=? WHERE id=?";
    dbcon.query(updateQuery,[remarks,id],(err,result,fields)=>{  
      if(err)
      response.status(400).json(err);
      else
      response.status(200).json({message:"Data Updated"}); 
    })
  }
  }


module.exports = { Find_, FindAll_, Add_, Update_, Remove_ ,UserDeposit_,AcceptPayment_,RejectPayment_};
