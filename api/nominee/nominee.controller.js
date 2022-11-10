const { add,update,find,findall,remove,userNominee } = require("./nominee.services");





const Add_ = (request, response) => {
  const{name, dob, user_id, user_type}=request.body;
  if(name==undefined || dob==undefined ||user_id==undefined || user_type==undefined )
  response.status(400).json({ message: "Invalid Request" });
  else{
    let data={name, dob, user_id, user_type,status:1}
    add(data,(err,result)=>{
      if (err) 
      response.status(500).json({ message: "Internal Server Error" });
      else
      response.status(200).json(result);
     });

    response.json(data)
  }
};




const Update_ = (request, response) => {
  let {name, dob, user_id, user_type,status}=request.body;
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

        if(newData.name!=undefined && newData.name!=oldData.name)
        oldData={...oldData,name:newData.name};

        if(newData.dob!=undefined && newData.dob!=oldData.dob)
        oldData={...oldData,dob:newData.dob};

        if(newData.user_id!=undefined && newData.user_id!=oldData.user_id)
        oldData={...oldData,user_id:newData.user_id};

        if(newData.user_type!=undefined && newData.user_type!=oldData.user_type)
        oldData={...oldData,user_type:newData.user_type};

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

const UserNominee_ = (request, response) => {
  let {user_id,user_type}=request.body;
  if(user_id==undefined || user_type==undefined)
      response.status(400).json({ message: "Invalid Request" });
  else{
    userNominee(request.body, (err, result) => {
          if (err) response.status(500).json({ message: "Internal Server Error" });
          else if (result.length == 0)
            response.status(404).json({ message: "No data found" });
          else response.status(200).json(result);
        });
  }  
};


module.exports = { Find_, FindAll_, Add_, Update_, Remove_ ,UserNominee_};
