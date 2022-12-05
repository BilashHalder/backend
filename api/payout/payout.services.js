const dbcon = require("../../config/dbconfig");

/***********************************
 * all database query
 ***********************************/


let invesmentquery=`SELECT account.account_no,account.ifsc_code,account.bank,investment.id,investment.user_id,investment.status,investment.user_type,investment.ammount,investment.date_time,investment.roi,investment.nominee_id,investment.agreement_file,investment.withdrw_req_time,investment.last_payment FROM investment INNER JOIN account ON account.account_no = investment.account_no`;
let withdrawalquery="SELECT * FROM withdrawal_request WHERE status=0";
let salaryquery="SELECT employee_info.last_payment, employee_info.joining_date,employee_info.employee_id,employee_info.salary_id FROM employee_info INNER JOIN employee ON employee_info.employee_id = employee.id"
let associatequery='SELECT SUM(investment.ammount) AS total FROM investment WHERE investment.referral_id=123456 AND status=1';
let payoutsquery='SELECT * FROM payout WHERE invesment_id=?';


const invesment=(data, callBack)=>{
    dbcon.query(invesmentquery, [], (err, result, fields) => {
        if(err)
        return callBack(err);
        else
         return callBack(null,result);
    });
}



const salary=(data, callBack)=>{
    dbcon.query(salaryquery, [], (err, result, fields) => {
        if(err)
        return callBack(err);
        else
         return callBack(null,result);
    });
}

const withdrawal=(data, callBack)=>{
    dbcon.query(withdrawalquery, [], (err, result, fields) => {
        if(err)
        return callBack(err);
        else
         return callBack(null,result);
    });
}


const associate=(data, callBack)=>{
    dbcon.query(associatequery, [], (err, result, fields) => {
        if(err)
        return callBack(err);
        else
         return callBack(null,result[0]);
    });
}


const payouts=(data, callBack)=>{
    dbcon.query(payoutsquery, [data], (err, result, fields) => {
        if(err)
        return callBack(err);
        else
         return callBack(null,result);
    });
}


module.exports={invesment,salary,withdrawal,associate,payouts};
