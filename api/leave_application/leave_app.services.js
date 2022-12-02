const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/

let addquery='INSERT INTO leave_application(employee_id,category,from_date,to_date,total_days,status) VALUES (?,?,?,?,?,?)';
let updateQuery='UPDATE leave_application SET employee_id=?,category=?,from_date=?,to_date=?,total_days=?,status=? WHERE id=?';
let findQuery='SELECT * FROM leave_application WHERE id=?';
let findAllQuery='SELECT * FROM leave_application';
let deleteQuery='DELETE FROM leave_application WHERE id=?';
let findemployeeQuery='SELECT * FROM leave_application WHERE employee_id=?';


// Add Data in the Database....


const add = (data, callBack) => {
    const {employee_id,category,from_date,to_date,total_days,status}=data;
    dbcon.query(addquery, [employee_id,category,from_date,to_date,total_days,status], (err, result, fields) => {
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
    const {employee_id,category,from_date,to_date,total_days,status,id}=data;
    dbcon.query(updateQuery,[employee_id,category,from_date,to_date,total_days,status,id], (err, result, fields) => {
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

// find all from the Database based on emp_id....

const findemployeeleaves = (id, callBack) => {
    dbcon.query(findemployeeQuery, [id], (err, result, fields) => {
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



module.exports={add,update,find,findall,remove,findemployeeleaves};
