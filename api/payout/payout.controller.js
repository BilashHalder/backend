const { invesment,salary,withdrawal,payouts,userwithdrwals} = require("./payout.services");
const {servererror,invalidrequest,updatemessge,datanotfound,deletemsg,imageerror,alreadyused,passerror,invaliddata,invalid}=require('../../locale/en');



const FindAllSalary_ = (request, response) => {
  salary(null, (err, result) => {
    if (err) response.status(500).json({ message: servererror });
    else if (result.length == 0)
      response.status(404).json({ message: datanotfound});
    else response.status(200).json(result);
  });
};

const FindAllInvesments_ = (request, response) => {
  invesment(null, (err, result) => {
    if (err) response.status(500).json({ message: servererror });
    else if (result.length == 0)
      response.status(404).json({ message: datanotfound});
    else response.status(200).json(result);
  });
};

const FindAllWithdrawal_ = (request, response) => {
  withdrawal(null, (err, result) => {
    if (err) response.status(500).json({ message: servererror });
    else if (result.length == 0)
      response.status(404).json({ message: datanotfound});
    else response.status(200).json(result);
  });
};

const FindInvesmentPayouts_ = (request, response) => {
  payouts([request.params.id], (err, result) => {
    if (err) response.status(500).json({ message: servererror });
    else if (result.length == 0)
      response.status(404).json({ message: datanotfound});
  else{ response.status(200).json(result);}
  });
};


const FindUserWithdrwals_=(request, response) => {
  let {user_id,user_type}=request.body;
  console.log(request.body)
  if(!user_id || !user_type)
  response.status(400).json({message:"Invalid Data"});
  else{
    userwithdrwals([request.body], (err, result) => {
      if (err) response.status(500).json({ message: servererror });
      else if (result.length == 0)
        response.status(404).json({ message: datanotfound});
    else{ response.status(200).json(result);}
    });
  }

};





module.exports = { FindAllInvesments_,FindAllSalary_,FindAllWithdrawal_,FindInvesmentPayouts_,FindUserWithdrwals_ };
