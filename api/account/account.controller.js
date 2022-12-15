const { add,update,find,findall,remove,userAccounts } = require("./account.services");
const {servererror,invalidrequest,updatemessge,datanotfound,deletemsg}=require('../../locale/en');


const Add_ = (request, response) => {

    const{account_no, ifsc_code, bank, user_id, user_type}=request.body;
    if(account_no==undefined || ifsc_code==undefined ||bank==undefined || user_id==undefined || user_type==undefined )
    response.status(400).json({ message: invalidrequest });
    else{
        let data={account_no, ifsc_code, bank, user_id, user_type,status:1}
        add(data,(err,result)=>{
            if (err) 
            response.status(500).json({ message: servererror });
            else
            response.status(200).json({message:'Bank Account Information Saved',result});
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
      else if (result.length == 0)
        response.status(404).json({ message: invalidrequest });
      else {
        let newData=request.body;
        let oldData=result;
        if(newData.account_no!=undefined && newData.account_no!=oldData.account_no)
        oldData={...oldData,account_no:newData.account_no};

        if(newData.ifsc_code!=undefined && newData.ifsc_code!=oldData.ifsc_code)
        oldData={...oldData,ifsc_code:newData.ifsc_code};

        if(newData.bank!=undefined && newData.bank!=oldData.bank)
        oldData={...oldData,bank:newData.bank};

        if(newData.user_id!=undefined && newData.user_id!=oldData.user_id)
        oldData={...oldData,user_id:newData.user_id};

        if(newData.user_type!=undefined && newData.user_type!=oldData.user_type)
        oldData={...oldData,user_type:newData.user_type};

        if(newData.status!=undefined && newData.status!=oldData.status)
        oldData={...oldData,status:newData.status};

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
      else if (result.length == 0)
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


const UserAccounts_ = (request, response) => {
    let {user_id,user_type}=request.body;
    console.log(request.body)
    if(user_id==undefined || user_type==undefined)
        response.status(400).json({ message: invalidrequest });
    else{
        userAccounts(request.body, (err, result) => {
            if (err) response.status(500).json({ message: servererror });
            else if (result.length == 0)
              response.status(404).json({ message: datanotfound });
            else response.status(200).json(result);
          });
    }  
  };


module.exports = { Find_, FindAll_, Add_, Update_, Remove_,UserAccounts_ };
