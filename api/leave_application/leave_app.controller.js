const { add, update, find, findall, remove,findemployeeleaves } = require("./leave_app.services");
const {servererror,invalidrequest,updatemessge,datanotfound}=require('../../locale/en');

const dbcon = require("../../config/dbconfig");


//employee_id,category,from_date,to_date,total_days,status
const Add_ = (request, response) => {
  let {employee_id,category,from_date,to_date,total_days,status}=request.body;

  if(employee_id==undefined || category==undefined || from_date==undefined || to_date==undefined || total_days==undefined || status==undefined)
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


//

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

const FindEmployee_ = (request, response) => {
  let _id = request.params.id;
  if (isNaN(_id)) response.status(400).json({ message: invalidrequest });
  else {
    findemployeeleaves(_id, (err, result) => {
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

const Accept_=(request, response)=>{
  let _id = request.params.id;
  if (isNaN(_id)) response.status(400).json({ message: invalidrequest });
  else{
    find(_id, (err, result) => {
      if (err) response.status(500).json({ message: servererror });
      else if (!result)
        response.status(404).json({ message: datanotfound });
      else {
         let emp_id=result.employee_id;
         let cat=result.category;
         let tdays=result.total_days;
         let qur1="SELECT * FROM leave_remain WHERE employee_id=?";
         dbcon.query(qur1,[emp_id],(err, result, fields)=>{
          if(err)
          response.status(500).json({ message: servererror });
          else {
            let temp= result[0];
            let qur='';
            let td=0;
            if(cat=='annual'){
              td=parseInt(temp.annual)-parseInt(tdays);
              qur="UPDATE leave_remain SET annual=? WHERE id=?"
            }
            else if(cat=='bereavement'){
               td=parseInt(temp.bereavement)-parseInt(tdays);
               qur="UPDATE leave_remain SET bereavement=? WHERE id=?"
             }
             else if(cat=='casual'){
               td=parseInt(temp.casual)-parseInt(tdays);
               qur="UPDATE leave_remain SET casual=? WHERE id=?"
             }
             else if(cat=='maternity'){
               td=parseInt(temp.maternity)-parseInt(tdays);
               qur="UPDATE leave_remain SET maternity=? WHERE id=?"
             }
             else if(cat=='others'){
               td=parseInt(temp.others)-parseInt(tdays);
               qur="UPDATE leave_remain SET others=? WHERE id=?"
             }
             else if(cat=='sick'){
               td=parseInt(temp.sick)-parseInt(tdays);
               qur="UPDATE leave_remain SET sick=? WHERE id=?"
             }
             else{
              qur=null;
             }


             if(qur){
              dbcon.query(qur,[td,temp.id],(err, result, fields)=>{
                if(err)
                response.status(500).json({ message: servererror });
                else{
                  dbcon.query("UPDATE `leave_application` SET status=1 WHERE id=?",[_id],(err, result, fields)=>{
                    if(err)
                    response.status(500).json({ message: servererror });
                    else{
                      response.status(200).json({ message: "Leave Application Accepted" });
                    }
                  })
                }
              })
             }
             else{
              response.status(400).json({ message: invalidrequest });
             }
           
          }
         });
      }
    });
  }
}

const Reject_=(request, response)=>{
  let _id = request.params.id;
  if (isNaN(_id)) response.status(400).json({ message: invalidrequest });
  else{

    dbcon.query("UPDATE `leave_application` SET status=2 WHERE id=?",[_id],(err, result, fields)=>{
      if(err)
      response.status(500).json({ message: servererror });
      else{
        response.status(200).json({ message: "Leave Application Rejected" });
      }
    })
  }

}



module.exports = { Find_, FindAll_, Add_, Update_, Remove_ ,FindEmployee_,Accept_,Reject_};
