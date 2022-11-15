const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/
//name, gender,email,phone,balance,pass,image,status
let addquery='INSERT INTO employee(name, gender,email,phone,balance,pass,image,status) VALUES (?,?,?,?,?,?,?,?)';
let updateQuery='UPDATE employee SET name=?,gender=?,email=?,phone=?,balance=?,pass=?,image=?,status=? WHERE id=?';
let findQuery='SELECT * FROM employee WHERE id=?';
let findAllQuery='SELECT * FROM employee';
let deleteQuery='DELETE FROM employee WHERE id=?';
let findbyemailQuery="SELECT * FROM employee WHERE email=? OR phone=?"


// Add Data in the Database....


const add = (data, callBack) => {
    const {name,gender,email,phone,balance,pass,img,status}=data;
    dbcon.query(addquery, [name,gender,email,phone,balance,pass,img,status], (err, result, fields) => {
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
    const {name,gender,email,phone,balance,pass,image,status,id}=data;
    dbcon.query(updateQuery, [name,gender,email,phone,balance,pass,image,status,id], (err, result, fields) => {
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
