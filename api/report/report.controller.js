const { add, update, find, findall, remove } = require("./report.services");



const Add_ = (request, response) => {
  let { employee_id} = request.body;
  if(employee_id==undefined)
  response.status(400).json({ message: "Invalid Request" });
  else{
    let temp={employee_id};
  add(temp,(err,result)=>{
  if (err) 
  response.status(500).json({ message: "Internal Server Error" });
  else
  response.status(200).json(result);
 });
  }
};




const Update_ = (request, response) => {
  let {employee_id, report_to,report_date,start_time,submit_time, report, document_url, status} = request.body;

  if (isNaN(request.params.id))
    response.status(400).json({ message: "Invalid Request" });
  else {
    find(request.params.id, (err, result) => {
      if (err) 
      response.status(500).json({ message: "Internal Server Error " });
      else if (!result)
        response.status(404).json({ message: "Invalid request" });
      else {
        let newData=request.body;
        let oldData=result;


        if(newData.employee_id!=undefined && newData.employee_id!=oldData.employee_id)
        oldData={...oldData,employee_id:newData.employee_id};

        if(newData.report_to!=undefined && newData.report_to!=oldData.report_to)
        oldData={...oldData,report_to:newData.report_to};

        if(newData.report_date!=undefined && newData.report_date!=oldData.report_date)
        oldData={...oldData,report_date:newData.report_date};

        if(newData.start_time!=undefined && newData.start_time!=oldData.start_time)
        oldData={...oldData,start_time:newData.start_time};

        if(newData.submit_time!=undefined && newData.submit_time!=oldData.submit_time)
        oldData={...oldData,submit_time:newData.submit_time};

        if(newData.report!=undefined && newData.report!=oldData.report)
        oldData={...oldData,report:newData.report};

        if(newData.status!=undefined && newData.status!=oldData.status)
        oldData={...oldData,status:newData.status};

        if(request.files!=undefined && request.files.doc!=undefined)
        {
          if(!pdfValidation(request.files.doc)){
            response.status(400).json({ message: "Invalid File " });
          }
          else{
            let fname=pdfUpload(request.files.doc);
            oldData={...oldData,document_url:fname};
            update(oldData,(err, result) => {
              if (err)
                response.status(500).json({ message: "Internal Server Error" });
              else if (result.affectedRows == 0)
                response.status(406).json({ message: "No Data Found" });
              else
                response.status(200).json({ message: "Data Updated Successfully" });
            });
          }

        }

        else {
          update(oldData,(err, result) => {
            if (err)
              response.status(500).json({ message: "Internal Server Error" });
            else if (result.affectedRows == 0)
              response.status(406).json({ message: "No Data Found" });
            else
              response.status(200).json({ message: "Data Updated Successfully" });
          });
        }

       

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


const FindEmp_ = (request, response) => {
  let _id = request.params.id;
  if (isNaN(_id)) response.status(400).json({ message: "Invalid Request" });
  else {
    employeeall(_id, (err, result) => {
      if (err) response.status(500).json({ message: "Internal Server Error" });
      else if (result.length==0)
        response.status(404).json({ message: "No data found" });
      else response.status(200).json(result);
    });
  }
};

module.exports = { Find_, FindAll_, Add_, Update_, Remove_,FindEmp_ };
