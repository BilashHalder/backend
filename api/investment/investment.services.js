const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/

let addquery='INSERT INTO investment(user_id,user_type,ammount,roi,nominee_id,account_no,payment_id, agreement_file,status,withdrw_req_time,is_send) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
let updateQuery='UPDATE investment SET user_id=?,user_type=?,ammount=?,roi=?,nominee_id=?,account_no=?,payment_id=?,agreement_file=?,status=?,withdrw_req_time=?,is_send=? WHERE id=?';
let findQuery='SELECT * FROM investment WHERE id=?';
let findAllQuery='SELECT * FROM investment';
let deleteQuery='DELETE FROM investment WHERE id=?';
let userQuery='SELECT * FROM investment WHERE user_id=? AND user_type = ?';

// Add Data in the Database....


const add = (data, callBack) => {
    const {user_id,user_type,ammount,roi,nominee_id,account_no,payment_id, agreement_file,status,withdrw_req_time,is_send}=data;
    dbcon.query(addquery, [user_id,user_type,ammount,roi,nominee_id,account_no,payment_id, agreement_file,status,withdrw_req_time,is_send], (err, result, fields) => {
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
    const {user_id,user_type,ammount,roi,nominee_id,account_no,payment_id,status,withdrw_req_time,is_send,id}=data;



    
    dbcon.query(updateQuery,[user_id,user_type,ammount,roi,nominee_id,account_no,payment_id,agreement_file,status,withdrw_req_time,is_send,id], (err, result, fields) => {
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

// remove Data from the Database....

const user = (data, callBack) => {
    const {user_id,user_type}=data;
    dbcon.query(userQuery,[user_id,user_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

module.exports={add,update,find,findall,remove,user};
