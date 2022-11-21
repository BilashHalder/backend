const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/

let addquery='INSERT INTO contact_us(name,phone_no,subject,message) VALUES (?,?,?,?)';
let updateQuery='UPDATE contact_us SET name=?,phone_no=?,subject=?,message=?,status=?,remarks=? WHERE id=?';
let findQuery='SELECT * FROM contact_us WHERE id=?';
let findAllQuery='SELECT * FROM contact_us';
let deleteQuery='DELETE FROM contact_us WHERE id=?';


// Add Data in the Database....


const add = (data, callBack) => {
    const {name,phone_no,subject,message}=data;
    dbcon.query(addquery, [name,phone_no,subject,message], (err, result, fields) => {
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
    const {name,phone_no,subject,message,status,remarks,id}=data;
    dbcon.query(updateQuery, [name,phone_no,subject,message,status,remarks,id], (err, result, fields) => {
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




module.exports={add,update,find,findall,remove};
