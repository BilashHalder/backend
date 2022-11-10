const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/
//employee_id, report_to,report_date,start_time,submit_time, report, document_url, status


let addquery='INSERT INTO work_report(employee_id)VALUES (?)';
let updateQuery='UPDATE work_report SET employee_id=?,report_to=?,report_date=?,start_time=?,submit_time=?,report=?,document_url=?,status=? WHERE id=?';
let findQuery='SELECT * FROM work_report WHERE id=?';
let findAllQuery='SELECT * FROM work_report';
let deleteQuery='DELETE FROM work_report WHERE id=?';

//let employeeAllQuery='SELECT * FROM qualification WHERE employee_id=?';


// Add Data in the Database....


const add = (data, callBack) => {
    const {employee_id}=data;
    dbcon.query(addquery, [employee_id], (err, result, fields) => {
        if(err)
        return callBack(err);
        else{
            find(result.insertId,(err,res)=>{
                if(err)
                return callBack(err);
                else
                return callBack(null,res);
            })
        }
    });
}


// Update Data in the Database....

const update = (data, callBack) => {
    const {employee_id, report_to,report_date,start_time,submit_time, report, document_url, status,id}=data;
    dbcon.query(updateQuery,[employee_id, report_to,report_date,start_time,submit_time, report, document_url, status,id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


// Find Data from the Database....

const find = (id, callBack) => {
    dbcon.query(findQuery, [id], (err, result, fields) => {
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

// remove Data from the Database....

const remove = (id, callBack) => {
    dbcon.query(deleteQuery,[id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

// const employeeall = (id, callBack) => {
//     dbcon.query(employeeAllQuery,[id], (err, result, fields) => {
//         if(err)
//         return callBack(err);
//         return callBack(null,result);
//     });
// }



module.exports={add,update,find,findall,remove};
