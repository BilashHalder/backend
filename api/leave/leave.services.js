const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/


let addquery='INSERT INTO leave_category(annual,casual,sick,maternity,bereavement,others) VALUES (?,?,?,?,?,?)';
let updateQuery='UPDATE leave_category SET annual=?,casual=?,sick=?,maternity=?,bereavement=?,others=? WHERE id=?';
let findQuery='SELECT * FROM leave_category WHERE id=?';
let findAllQuery='SELECT * FROM leave_category';
let deleteQuery='DELETE FROM leave_category WHERE id=?';


// Add Data in the Database....


const add = (data, callBack) => {
    const {annual,casual,sick,maternity,bereavement,others}=data;
    dbcon.query(addquery, [annual,casual,sick,maternity,bereavement,others], (err, result, fields) => {
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
    const {annual,casual,sick,maternity,bereavement,others,id}=data;
    dbcon.query(updateQuery,[annual,casual,sick,maternity,bereavement,others,id], (err, result, fields) => {
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
