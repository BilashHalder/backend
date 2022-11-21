const dbcon = require("../../config/dbconfig");
const findAdminQuery="SELECT * FROM admin WHERE email=? OR phone=?";
const findCustomerQuery="SELECT * FROM customer WHERE email=? OR phone=?";
const findAssociateQuery="SELECT * FROM associate WHERE email=? OR phone=?";
const findEmployeeQuery="SELECT * FROM employee WHERE email=? OR phone=?";


const findAdnin = (id, callBack) => {
    dbcon.query(findAdminQuery, [id,id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result[0]);
    });
}

const findCustomer = (id, callBack) => {
    dbcon.query(findCustomerQuery, [id,id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result[0]);
    });
}

const findAssociate = (id, callBack) => {
    dbcon.query(findAssociateQuery, [id,id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result[0]);
    });
}

const findEmployee = (id, callBack) => {
    dbcon.query(findEmployeeQuery, [id,id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result[0]);
    });
}

module.exports={findAdnin,findCustomer,findAssociate,findEmployee}

