const { add,update,find,findall,remove,upcomingholidays } = require("./holidays.services");




//
const Add_ = (request, response) => {
  const{title,h_date}=request.body;
  if(title==undefined || h_date==undefined )
  response.status(400).json({ message: "Invalid Request" });
  else{
    let data={title,h_date}
    add(data,(err,result)=>{
      if (err) 
      response.status(500).json({ message: "Internal Server Error" });
      else
      response.status(200).json(result);
     });
  }
};




const Update_ = (request, response) => {
  let {title,h_date}=request.body;
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

        if(newData.title!=undefined && newData.title!=oldData.title)
        oldData={...oldData,title:newData.title};

        if(newData.h_date!=undefined && newData.h_date!=oldData.h_date)
        oldData={...oldData,h_date:newData.h_date};
        
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

const upcomingHolidays_ = (request, response) => {

    upcomingholidays(null, (err, result) => {
          if (err) response.status(500).json({ message: "Internal Server Error" });
          else if (result.length == 0)
            response.status(404).json({ message: "No Upcoming Holidays" });
          else response.status(200).json(result);
        });

};


module.exports = { Find_, FindAll_, Add_, Update_, Remove_ ,upcomingHolidays_};
