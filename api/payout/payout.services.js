const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/


let addquery='INSERT INTO payout(invesment_id,account_no,ifsc_code,amount,user_id,user_type, transaction_id, status) VALUES (?,?,?,?,?,?,?,?)';
let updateQuery='UPDATE payout SET invesment_id=?,account_no=?,ifsc_code=?,amount=?,user_id=?,user_type=?,transaction_id=?,status=? WHERE id=?';
let findQuery='SELECT * FROM payout WHERE id=?';
let invesmentQuery='SELECT * FROM payout WHERE invesment_id=?';
let findAllQuery='SELECT * FROM payout';
let userAllQuery='SELECT * FROM payout WHERE user_id=? AND user_type=?';
let deleteQuery='DELETE FROM payout WHERE id=?';


// Add Data in the Database....


const add = (data, callBack) => {
    const {invesment_id,account_no,ifsc_code,amount,user_id,user_type, transaction_id,status}=data;
    dbcon.query(addquery, [invesment_id,account_no,ifsc_code,amount,user_id,user_type,transaction_id,status], (err, result, fields) => {
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
    const {invesment_id,account_no,ifsc_code,amount,user_id,user_type,transaction_id,status,id}=data;
    dbcon.query(updateQuery,[invesment_id,account_no,ifsc_code,amount,user_id,user_type,transaction_id,status,id], (err, result, fields) => {
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


const findinvesment = (id, callBack) => {
    dbcon.query(invesmentQuery, [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


const userpayout = (data, callBack) => {
    dbcon.query(userAllQuery, [data.user_id,data.user_type], (err, result, fields) => {
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



module.exports={add,update,find,findall,findinvesment,userpayout,remove};
