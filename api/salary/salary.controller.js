const { add, update, find, findall, remove } = require("./salary.services");
const {servererror,invalidrequest,updatemessge,datanotfound,deletemsg,imageerror,alreadyused,passerror,invaliddata,invalid}=require('../../locale/en');





const Add_ = (request, response) => {

  let {basic, hra, conveyance, medical, special, pf, insurance, tax}=request.body;

  if(!(basic)||!(hra)||!(conveyance)||!(medical)||!(special)||!(pf)||!(insurance)||!(tax))
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

        if(newData.basic!=undefined && newData.basic!=oldData.basic)
        oldData={...oldData,basic:newData.basic};

        if(newData.hra!=undefined && newData.hra!=oldData.hra)
        oldData={...oldData,hra:newData.hra};


        if(newData.conveyance!=undefined && newData.conveyance!=oldData.conveyance)
        oldData={...oldData,conveyance:newData.conveyance};


        if(newData.medical!=undefined && newData.medical!=oldData.medical)
        oldData={...oldData,medical:newData.medical};

        if(newData.special!=undefined && newData.special!=oldData.special)
        oldData={...oldData,special:newData.special};

        if(newData.pf!=undefined && newData.pf!=oldData.pf)
        oldData={...oldData,pf:newData.pf};

        if(newData.insurance!=undefined && newData.insurance!=oldData.insurance)
        oldData={...oldData,insurance:newData.insurance};

        if(newData.tax!=undefined && newData.tax!=oldData.tax)
        oldData={...oldData,tax:newData.tax};

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
    if (err) response.status(500).json({ message: servererror });
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
