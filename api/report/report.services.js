const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/
//`report_id`, `employee_id`, `report_date`, `start_time`, `report_to`, `submit_time`, `report`, `document_url`, `login_location`, `logout_location`, `reject_for`, `status`



let addQuery='INSERT INTO work_report(employee_id,report_date,start_time,login_location) VALUES (?,CURRENT_DATE,CURRENT_TIME,?)';



let updateQuery='UPDATE work_report SET report_to=?,submit_time=CURRENT_TIME,report=?,document_url=?,logout_location=?,status=?,reject_for=? WHERE id=?';
let finbByDateQuery='SELECT * FROM work_report WHERE report_date=?';
let empReportQuery='SELECT * FROM work_report WHERE report_date>=? AND report_date<=? AND employee_id=?';
let approveList="SELECT * FROM work_report WHERE report_to=?";
let isExist='SELECT * FROM work_report WHERE report_date=CURRENT_DATE AND employee_id=?';
let findAllQuery='SELECT * FROM work_report';
let findbyempQuery='SELECT * FROM work_report WHERE employee_id=?';

let acceptQuery="UPDATE work_report SET "

let findbyid='SELECT * FROM work_report WHERE id=?'




// Add Data in the Database....


const add = (data, callBack) => {
 
    const {employee_id,login_location}=data;
    dbcon.query(isExist,[employee_id], (err, result, fields) =>{
        if(err)
       { return callBack(err);}
        else{
        
          if(result.length==0){
            dbcon.query(addQuery,[employee_id,login_location],(err, result, fields) =>{
                if(err)
                return callBack(err);
                else
                return callBack(null,{res:"ok"});
            });
          }  
        } 
    });
}


// Update Data in the Database....

const update = (data, callBack) => {
    const {report_to,report,document_url,status,id}=data;
    dbcon.query(updateQuery,[report_to,report, document_url, status,id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


// Find By date of all employee....

const findbydate = (wdate, callBack) => {
    dbcon.query(finbByDateQuery, [wdate], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

// Find  employee Work report ....

const findempreport = (data, callBack) => {
    const {start_date,end_date,employee_id}=data;
    dbcon.query(empReportQuery,[start_date,end_date,employee_id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const reporttoapprove = (employee_id, callBack) => {
    dbcon.query(approveList,[employee_id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


// Find Data from the Database....

const find = (id, callBack) => {
    dbcon.query(findbyid, [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result[0]);
    });
}


// find all from the Database....

const findall = (id, callBack) => {
    dbcon.query(findAllQuery, [], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const findbyempid = (id, callBack) => {
    dbcon.query(findbyempQuery, [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result[0]);
    });
}


// remove Data from the Database....

const remove = (id, callBack) => {
    dbcon.query(deleteQuery,[id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const todayreport=(employee_id,callBack)=>{
    dbcon.query(isExist,[employee_id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result[0]);
    }); 
}



module.exports={add,update,find,findall,remove,findbydate,findempreport,reporttoapprove,findbyempid,todayreport};
