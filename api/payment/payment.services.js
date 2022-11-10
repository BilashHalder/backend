const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/

let addquery='INSERT INTO payment(payment_mode,transaction_id,ammount,status,to_account, from_account,remarks) VALUES (?,?,?,?,?,?,?)';
let updateQuery='UPDATE payment SET payment_mode=?,transaction_id=?,ammount=?,status=?,to_account=?,from_account=?,remarks=? WHERE id=?';
let findQuery='SELECT * FROM payment WHERE id=?';
let findAllQuery='SELECT * FROM payment';
let deleteQuery='DELETE * FROM payment WHERE id=?';


// Add Data in the Database....


const add = (data, callBack) => {
    const {payment_mode,transaction_id,ammount,status,to_account, from_account,remarks}=data;
    dbcon.query(addquery, [payment_mode,transaction_id,ammount,status,to_account, from_account,remarks], (err, result, fields) => {
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
    const {payment_mode,transaction_id,ammount,status,to_account, from_account,remarks,id}=data;
    dbcon.query(updateQuery,[payment_mode,transaction_id,ammount,status,to_account, from_account,remarks,id], (err, result, fields) => {
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



module.exports={add,update,find,findall,remove};
