const dbcon = require("../config/dbconfig");

const getInformation=({user_id,user_type})=>{
    let qur='';
    if(user_type==1)
    qur='SELECT * FROM customer WHERE id=?';
    else if(user_type==2)
    qur='SELECT * FROM associate WHERE id=?'
    else 
    qur='SELECT * FROM employee WHERE id=?'

    dbcon.query(qur,[user_id], (err, result, fields) => {
        if(err)
        return (err);
        return (result);
    });
}


module.exports={getInformation}