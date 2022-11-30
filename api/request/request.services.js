const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/

let addquery='INSERT INTO request( name, subject, message, email,phone, request_type) VALUES (?,?,?,?,?,?)';
let updateQuery='UPDATE request SET name=?,subject=?,message=?,email=?,phone=?,remarks=?,request_type=?,status=? WHERE id=?';
let findQuery='SELECT * FROM request WHERE id=?';
let findAllQuery='SELECT * FROM request';
let deleteQuery='DELETE FROM request WHERE id=?';


// Add Data in the Database....


const add = (data, callBack) => {
    const {name, subject, message, email,phone, request_type}=data;
    dbcon.query(addquery, [name, subject, message, email,phone, request_type], (err, result, fields) => {
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
    const {name,subject,message,email,phone,remarks,request_type,status,id}=data;
    dbcon.query(updateQuery, [name,subject,message,email,phone,remarks,request_type,status,id], (err, result, fields) => {
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




module.exports={add,update,find,findall,remove};
