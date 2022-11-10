const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/
//name,gender,email,commission_rate,employee_id,phone,balance,pass,image,status
let addquery='INSERT INTO associate(name,gender,email,commission_rate,employee_id,phone,balance,pass,image,status) VALUES (?,?,?,?,?,?,?,?,?,?)';
let updateQuery='UPDATE associate SET name=?,gender=?,email=?,commission_rate=?,employee_id=?,phone=?,balance=?,pass=?,image=?,status=? WHERE id=?';
let findQuery='SELECT * FROM associate WHERE id=?';
let findAllQuery='SELECT * FROM associate';
let deleteQuery='DELETE FROM associate WHERE id=?';
let findbyemailQuery="SELECT * FROM associate WHERE email=? OR phone=?"


// Add Data in the Database....


const add = (data, callBack) => {
    const {name,gender,email,commission_rate,employee_id,phone,balance,pass,image,status}=data;
    console.log(pass)
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
    const {name,gender,email,commission_rate,employee_id,phone,balance,pass,image,status,id}=data;
    dbcon.query(updateQuery, [name,gender,email,commission_rate,employee_id,phone,balance,pass,image,status,id], (err, result, fields) => {
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
