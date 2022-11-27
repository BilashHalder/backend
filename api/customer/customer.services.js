const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/

let addquery='INSERT INTO customer(name,gender,email,phone,balance,referred_by,pass,image,status) VALUES (?,?,?,?,?,?,?,?,1)';
let updateQuery='UPDATE customer SET name=?,gender=?,email=?,phone=?,referred_by=?,pass=?,image=?,status=? WHERE id=?';
let findQuery='SELECT * FROM customer WHERE id=?';
let findAllQuery='SELECT * FROM customer';
let deleteQuery='DELETE FROM customer WHERE id=?';
let findbyemailQuery="SELECT * FROM customer WHERE email=? OR phone=?"


// Add Data in the Database....


const add = (data, callBack) => {
    const {name,gender,email,phone,balance,referred_by,pass,img,status}=data;
    dbcon.query(addquery, [name,gender,email,phone,balance,referred_by,pass,img,status], (err, result, fields) => {
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
    const {name,gender,email,phone,referred_by,pass,image,status,id}=data;
    dbcon.query(updateQuery, [name,gender,email,phone,referred_by,pass,image,status,id], (err, result, fields) => {
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

module.exports={add,update,find,findall,remove,isRegister};
