const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/


let addquery='INSERT INTO holidays(title,h_date) VALUES (?,?)';
let updateQuery='UPDATE holidays SET title=?,h_date=? WHERE id=?';
let findQuery='SELECT * FROM holidays WHERE id=?';
let findAllQuery='SELECT * FROM holidays';
let deleteQuery='DELETE FROM holidays WHERE id=?';
let upcomingQuery='SELECT * FROM holidays WHERE h_date>=CURRENT_DATE';
let holidaysinrange='SELECT * FROM holidays WHERE h_date>=? AND h_date<=?';

// Add Data in the Database....


const add = (data, callBack) => {
    const {title,h_date}=data;
    dbcon.query(addquery, [title,h_date], (err, result, fields) => {
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
    const {title,h_date,id}=data;
    dbcon.query(updateQuery,[title,h_date,id], (err, result, fields) => {
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

//Holidays in range

const findholidaysinrange = (data, callBack) => {
    const {start_date,end_date}=data;
    dbcon.query(holidaysinrange, [start_date,end_date], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
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

const upcomingholidays = (data, callBack) => {
    dbcon.query(upcomingQuery,[], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

module.exports={add,update,find,findall,remove,upcomingholidays,findholidaysinrange};
