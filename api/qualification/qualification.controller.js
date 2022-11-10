const { add, update, find, findall, remove,employeeall } = require("./qualification.services");
const{pdfValidation,pdfUpload}=require('../../util/lib')




const Add_ = (request, response) => {
  let {degree_name, year_of_pass, degree_from, marks, employee_id} = request.body;
  if(degree_name==undefined|| year_of_pass==undefined||degree_from==undefined||marks==undefined||employee_id==undefined)
  response.status(400).json({ message: "Invalid Request" });
  else if(request.files==null || request.files.doc==null)
  response.status(400).json({ message: "Invalid Request " });
  else if(!pdfValidation(request.files.doc))
  response.status(400).json({ message: "Invalid File " });
  else{
    let temp={degree_name, year_of_pass, degree_from, marks, employee_id};
    let fname=pdfUpload(request.files.doc);
    temp={...temp,document_url:fname}
   
  add(temp,(err,result)=>{
  if (err) 
  response.status(500).json({ message: "Internal Server Error" });
  else
  response.status(200).json(result);
 });
  }
};




const Update_ = (request, response) => {
  let {degree_name, year_of_pass, degree_from, marks, employee_id} = request.body;

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


        if(newData.degree_name!=undefined && newData.degree_name!=oldData.degree_name)
        oldData={...oldData,degree_name:newData.degree_name};

        if(newData.year_of_pass!=undefined && newData.year_of_pass!=oldData.year_of_pass)
        oldData={...oldData,year_of_pass:newData.year_of_pass};

        if(newData.degree_from!=undefined && newData.degree_from!=oldData.degree_from)
        oldData={...oldData,degree_from:newData.degree_from};

        if(newData.marks!=undefined && newData.marks!=oldData.marks)
        oldData={...oldData,marks:newData.marks};

        if(newData.employee_id!=undefined && newData.employee_id!=oldData.employee_id)
        oldData={...oldData,employee_id:newData.employee_id};

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
      else if (result.length == 0)
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
