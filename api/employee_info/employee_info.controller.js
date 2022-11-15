const { add, update, find, findall, remove,finduser } = require("./employee_info.services");
const { pdfValidation, pdfUpload } = require('../../util/lib');
const {servererror,invalidrequest,updatemessge,datanotfound,deletemsg,imageerror,alreadyused,passerror,invaliddata,invalid}=require('../../locale/en');




const Add_ = (request, response) => {
  let {employee_id,designation_id,salary_id,leave_id,dob,report_to, joining_date}=request.body;
  if(!(employee_id) || !(designation_id) || !(salary_id) || !( leave_id) || !(dob) || !(report_to) ||!(joining_date))
  response.status(404).json({ message: invalidrequest });
  else{
  let data={employee_id,designation_id,salary_id,leave_id,dob,report_to, joining_date,acceptance_file:null,id_card:null}
  add(data,(err,result)=>{
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
    find(request.params.id, async(err, result) => {
      if (err) 
      response.status(500).json({ message: servererror });
      else if (!result)
        response.status(404).json({ message: invalidrequest });
      else {
        let oldData = result;
        let newData = request.body;


        if (newData.employee_id != undefined && newData.employee_id != oldData.employee_id)
          oldData = { ...oldData, employee_id: newData.employee_id };

          if (newData.designation_id != undefined && newData.designation_id != oldData.designation_id)
          oldData = { ...oldData, designation_id: newData.designation_id };

          if (newData.salary_id != undefined && newData.salary_id != oldData.salary_id)
          oldData = { ...oldData, salary_id: newData.salary_id };

          if (newData.leave_id != undefined && newData.leave_id != oldData.leave_id)
          oldData = { ...oldData, leave_id: newData.leave_id };


          if (newData.dob != undefined && newData.dob != oldData.dob)
          oldData = { ...oldData, dob: newData.dob };


          if (newData.report_to != undefined && newData.report_to != oldData.report_to)
          oldData = { ...oldData, report_to: newData.report_to };

          if (newData.joining_date != undefined && newData.joining_date != oldData.joining_date)
          oldData = { ...oldData, joining_date: newData.joining_date };

          if (newData.id_card != undefined && newData.id_card != oldData.id_card)
          oldData = { ...oldData, id_card: newData.id_card };
          
          
          let errmsg=null;
        if(request.files && request.files.acceptance_file)
          {
            acpfile=request.files.acceptance_file;
            if(!pdfValidation(acpfile))
            errmsg = 'Invalid File';
            let fu =  pdfUpload(acpfile);
            if (!fu)
             errmsg = servererror;
              else
              oldData = { ...oldData, acceptance_file: fu }
          }

          if(errmsg){
            response.status(404).json({ message: errmsg });
          }
          else{
             update(oldData,(err, result) => {
          if (err)
            response.status(500).json({ message: servererror });
          else if (result.affectedRows == 0)
            response.status(406).json({ message: datanotfound });
          else
            response.status(200).json({ message: updatemessge });
        });
          }
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



const FindUser_ = (request, response) => {
  let _id = request.params.id;
  if (isNaN(_id)) response.status(400).json({ message: invalidrequest });
  else {
    finduser(_id, (err, result) => {
      if (err) response.status(500).json({ message: servererror });
      else if (!result)
        response.status(404).json({ message: datanotfound });
      else response.status(200).json(result);
    });
  }
};


module.exports = { Find_, FindAll_, Add_, Update_, Remove_,FindUser_ };
