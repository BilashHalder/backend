const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/
//name,gender,email,commission_rate,employee_id,phone,balance,pass,image,status
let addquery='INSERT INTO associate(name,gender,email,commission_rate,employee_id,phone,balance,pass,image,status) VALUES (?,?,?,?,?,?,?,?,?,?)';
let updateQuery='UPDATE associate SET name=?,gender=?,email=?,commission_rate=?,employee_id=?,phone=?,balance=?,pass=?,image=?,status=?,referral_key=? WHERE id=?';
let findQuery='SELECT * FROM associate WHERE id=?';
let findAllQuery='SELECT * FROM associate';
let deleteQuery='DELETE FROM associate WHERE id=?';
let findbyemailQuery="SELECT * FROM associate WHERE email=? OR phone=?"
let refercustomerQuery="SELECT * FROM customer WHERE referred_by =?"
let updateBalanceQuery="UPDATE associate SET balance=? WHERE id=?"


// Add Data in the Database....


const add = (data, callBack) => {
    const {name,gender,email,commission_rate,employee_id,phone,balance,pass,image,status}=data;
    dbcon.query(addquery, [name,gender,email,commission_rate,employee_id,phone,balance,pass,image,status], (err, result, fields) => {
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
    console.log(data)
    const {name,gender,email,commission_rate,employee_id,phone,balance,pass,image,status,referral_key,id}=data;
    dbcon.query(updateQuery, [name,gender,email,commission_rate,employee_id,phone,balance,pass,image,status,referral_key,id], (err, result, fields) => {
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

const isRegister=(data, callBack) => {
    let {email,phone}=data;
        dbcon.query(findbyemailQuery,[email,phone], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


const refHistory=(ref_key, callBack)=>{
    dbcon.query(refercustomerQuery,[ref_key], (err, result, fields) => {
    if(err)
    return callBack(err);
    return callBack(null,result);
});
}


module.exports={add,update,find,findall,remove,isRegister,refHistory};

