const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/

let addquery='INSERT INTO deposit(mode, doc, reference, amount, user_id, user_type) VALUES (?,?,?,?,?,?)';
let updateQuery='UPDATE deposit SET user_id=?,user_type=?,remarks=?,status=?,amount=? WHERE id=?';
let findQuery='SELECT * FROM deposit WHERE id=?';
let findAllQuery='SELECT * FROM deposit';
let deleteQuery='DELETE FROM deposit WHERE id=?';
let userQuery='SELECT * FROM deposit WHERE user_id=? AND user_type=?';
let refQuery='SELECT * FROM deposit WHERE reference=?';

// Add Data in the Database....


const add = (data, callBack) => {
    const {mode, doc, reference, amount, user_id, user_type}=data;
    dbcon.query(addquery, [mode, doc, reference, amount, user_id, user_type], (err, result, fields) => {
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
    const {user_id,user_type,remarks,status,amount,id}=data;
    dbcon.query(updateQuery,[user_id,user_type,remarks,status,amount,id], (err, result, fields) => {
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

const userDeposit = (data, callBack) => {
    const {user_id, user_type}=data;
    dbcon.query(userQuery,[user_id, user_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


const refIsExist=(reference_id, callBack) => {
    dbcon.query(refQuery, [reference_id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result[0]);
    });
}


module.exports={add,update,find,findall,remove,userDeposit,refIsExist};
