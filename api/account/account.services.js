const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/
//account_no, ifsc_code, bank, user_id, user_type, status
let addquery='INSERT INTO account(account_no, ifsc_code, bank, user_id, user_type, status) VALUES (?,?,?,?,?,?)';
let updateQuery='UPDATE account SET account_no=?,ifsc_code=?,bank=?,user_id=?,user_type=?,status=? WHERE id=?';
let findQuery='SELECT * FROM account WHERE id=?';
let findAllQuery='SELECT * FROM account';
let deleteQuery='DELETE FROM account WHERE id=?';
let userAccountQuery='SELECT * FROM account WHERE user_id=? AND user_type=?';


// Add Data in the Database....


const add = (data, callBack) => {
    const {account_no, ifsc_code, bank, user_id, user_type, status}=data;
    dbcon.query(addquery, [account_no, ifsc_code, bank, user_id, user_type, status], (err, result, fields) => {
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
    const {account_no, ifsc_code, bank, user_id, user_type, status,id}=data;
    dbcon.query(updateQuery,[account_no, ifsc_code, bank, user_id, user_type, status,id], (err, result, fields) => {
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
const userAccounts = (data, callBack) => {
    const {user_id, user_type}=data;
    dbcon.query(userAccountQuery,[user_id, user_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}
// get all the account of user ....

module.exports={add,update,find,findall,remove,userAccounts};
