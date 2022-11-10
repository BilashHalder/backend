const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/

let addquery='INSERT INTO qualification(degree_name,year_of_pass,degree_from,marks,document_url,employee_id)VALUES (?,?,?,?,?,?)';
let updateQuery='UPDATE qualification SET degree_name=?,year_of_pass=?,degree_from=?,marks=?,document_url=?,employee_id=? WHERE id=?';
let findQuery='SELECT * FROM qualification WHERE id=?';
let findAllQuery='SELECT * FROM qualification';
let deleteQuery='DELETE FROM qualification WHERE id=?';
let employeeAllQuery='SELECT * FROM qualification WHERE employee_id=?';


// Add Data in the Database....


const add = (data, callBack) => {
    const {degree_name, year_of_pass, degree_from, marks, document_url, employee_id}=data;
    dbcon.query(addquery, [degree_name,year_of_pass,degree_from,marks,document_url,employee_id], (err, result, fields) => {
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
    const {degree_name,year_of_pass,degree_from,marks,document_url,employee_id,id}=data;
    dbcon.query(updateQuery,[degree_name,year_of_pass,degree_from,marks,document_url,employee_id,id], (err, result, fields) => {
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

const employeeall = (id, callBack) => {
    dbcon.query(employeeAllQuery,[id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}



module.exports={add,update,find,findall,remove,employeeall};
