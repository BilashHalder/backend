const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/

let addquery='INSERT INTO nominee(name,dob,user_id,user_type,status) VALUES (?,?,?,?,?)';
let updateQuery='UPDATE nominee SET name=?,dob=?,user_id=?,user_type=?,status=? WHERE id=?';
let findQuery='SELECT * FROM nominee WHERE id=?';
let findAllQuery='SELECT * FROM nominee';
let deleteQuery='DELETE FROM nominee WHERE id=?';
let userNomineeQuery='SELECT * FROM nominee WHERE user_id=? AND user_type=?';

// Add Data in the Database....


const add = (data, callBack) => {
    const {name, dob, user_id, user_type, status}=data;
    dbcon.query(addquery, [name,dob,user_id,user_type,status], (err, result, fields) => {
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
    const {name,dob,user_id,user_type,status,id}=data;
    dbcon.query(updateQuery,[name,dob,user_id,user_type,status,id], (err, result, fields) => {
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

const userNominee = (data, callBack) => {
    const {user_id, user_type}=data;
    dbcon.query(userNomineeQuery,[user_id, user_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

module.exports={add,update,find,findall,remove,userNominee};
