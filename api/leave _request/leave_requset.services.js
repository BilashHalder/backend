const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/
// `leave_apply`(`id`, `type`, `from_date`, `to_date`, `total_days`, `remarks`, `status`

let addquery='INSERT INTO leave_apply(type,from_date,to_date,total_days) VALUES (?,?,?,?)';
let updateQuery='UPDATE leave_apply SET type=?,from_date=?,to_date=?,total_days=?,remarks=?,status=? WHERE id=?';
let findQuery='SELECT * FROM leave_apply WHERE id=?';
let findAllQuery='SELECT * FROM leave_apply';
let deleteQuery='DELETE FROM leave_apply WHERE id=?';


// Add Data in the Database....


const add = (data, callBack) => {
    const {type,from_date,to_date,total_days}=data;
    dbcon.query(addquery, [type,from_date,to_date,total_days], (err, result, fields) => {
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
    const {type,from_date,to_date,total_days,remarks,status,id}=data;
    dbcon.query(updateQuery,[type,from_date,to_date,total_days,remarks,status,id], (err, result, fields) => {
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
    console.log("ooo")
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
