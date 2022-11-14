const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/

let addquery='INSERT INTO kyc(adhar_no,pan_no,address,adhar_verified,pan_verified,user_id,user_type) VALUES (?,?,?,?,?,?,?)';
let updateQuery='UPDATE kyc SET adhar_no=?,pan_no=?,address=?,adhar_verified=?,pan_verified=?,user_id=?,user_type=? WHERE id=?';
let findQuery='SELECT * FROM kyc WHERE id=?';
let findAllQuery='SELECT * FROM kyc';
let deleteQuery='DELETE FROM kyc WHERE id=?';
let findKycQuery='SELECT * FROM kyc WHERE user_id=? AND user_type=?'


// Add Data in the Database....


const add = (data, callBack) => {
    const {adhar_no,pan_no,address,adhar_verified,pan_verified,user_id,user_type}=data;
    dbcon.query(addquery, [adhar_no,pan_no,address,adhar_verified,pan_verified,user_id,user_type], (err, result, fields) => {
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
    const {adhar_no,pan_no,address,adhar_verified,pan_verified,user_id,user_type,id}=data;
    dbcon.query(updateQuery,[adhar_no,pan_no,address,adhar_verified,pan_verified,user_id,user_type,id], (err, result, fields) => {
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


const findKyc = (data, callBack) => {
    dbcon.query(findKycQuery, [data.user_id,data.user_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result[0]);
    });
}


module.exports={add,update,find,findall,remove,findKyc};
