const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/

let addquery='INSERT INTO employee_info(employee_id,designation_id,salary_id,leave_id,dob,report_to,joining_date, acceptance_file,id_card) VALUES (?,?,?,?,?,?,?,?,?)';
let updateQuery='UPDATE employee_info SET employee_id=?,designation_id=?,salary_id=?,leave_id=?,dob=?,report_to=?,joining_date=?,acceptance_file=?,id_card=? WHERE id=?';
let findQuery='SELECT * FROM employee_info WHERE id=?';
let findAllQuery='SELECT * FROM employee_info';
let deleteQuery='DELETE FROM employee_info WHERE id=?';
let empQuery="SELECT * FROM employee_info WHERE employee_id=?"


// Add Data in the Database....


const add = (data, callBack) => {
    const {employee_id,designation_id,salary_id,leave_id,dob,report_to,joining_date, acceptance_file,id_card}=data;
    dbcon.query(addquery, [employee_id,designation_id,salary_id,leave_id,dob,report_to,joining_date, acceptance_file,id_card], (err, result, fields) => {
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
    const {employee_id,designation_id,salary_id,leave_id,dob,report_to,joining_date, acceptance_file,id_card,id}=data;
    dbcon.query(updateQuery,[employee_id,designation_id,salary_id,leave_id,dob,report_to,joining_date, acceptance_file,id_card,id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


// Find Data from the Database....

const find = (id, callBack) => {
    console.log(id)
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

const finduser = (id, callBack) => {
    dbcon.query(empQuery, [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result[0]);
    });
}

module.exports={add,update,find,findall,remove,finduser};
