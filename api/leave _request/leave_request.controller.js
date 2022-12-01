const { add, update, find, findall, remove } = require("./leave_requset.services");
const {servererror,invalidrequest,updatemessge,datanotfound,deletemsg,imageerror,alreadyused,passerror,invaliddata,invalid}=require('../../locale/en');

const Add_ = (request, response) => {
  let {annual,casual,sick,maternity,bereavement,others}=request.body;
  if(annual==undefined||casual==undefined|| sick==undefined||maternity==undefined||bereavement==undefined||others==undefined)
  response.status(404).json({ message: invalidrequest });
  else{
  add(request.body,(err,result)=>{
    if (err) 
   {
    console.log(err)
    response.status(500).json({ message: servererror });
   }
    else
    response.status(200).json(result);
   });
} 
};


////, ,,,,

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

        if(newData.annual!=undefined && newData.annual!=oldData.annual)
        oldData={...oldData,annual:newData.annual};

        if(newData.casual!=undefined && newData.casual!=oldData.casual)
        oldData={...oldData,casual:newData.casual};


        if(newData.sick!=undefined && newData.sick!=oldData.sick)
        oldData={...oldData,sick:newData.sick};


        if(newData.maternity!=undefined && newData.maternity!=oldData.maternity)
        oldData={...oldData,maternity:newData.maternity};

        if(newData.bereavement!=undefined && newData.bereavement!=oldData.bereavement)
        oldData={...oldData,bereavement:newData.bereavement};

        if(newData.others!=undefined && newData.others!=oldData.others)
        oldData={...oldData,others:newData.others};

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
  console.log("aaaa")
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
