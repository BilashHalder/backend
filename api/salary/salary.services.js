const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/

let addquery='INSERT INTO salary(basic,hra,conveyance,medical,special,pf,insurance,tax) VALUES (?,?,?,?,?,?,?,?)';
let updateQuery='UPDATE salary SET basic=?,hra=?,conveyance=?,medical=?,special=?,pf=?,insurance=?,tax=? WHERE id=?';
let findQuery='SELECT * FROM salary WHERE id=?';
let findAllQuery='SELECT * FROM salary';
let deleteQuery='DELETE FROM salary WHERE id=?';


// Add Data in the Database....


const add = (data, callBack) => {
    const {basic,hra,conveyance,medical,special,pf,insurance,tax}=data;
    dbcon.query(addquery, [basic,hra,conveyance,medical,special,pf,insurance,tax], (err, result, fields) => {
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
    const {basic,hra,conveyance,medical,special,pf,insurance,tax,id}=data;
    dbcon.query(updateQuery,[basic,hra,conveyance,medical,special,pf,insurance,tax,id], (err, result, fields) => {
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



module.exports={add,update,find,findall,remove};
