require('dotenv').config();
const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const fs=require('fs');





const AccountRouter=require('./api/account/account.router');
const CustomerRouter=require('./api/customer/customer.route');
const AssociateRouter=require('./api/associate/associate.route');
const EmployeeRouter=require('./api/employee/employee.route');
const NomineeRouter=require('./api/nominee/nominee.route');
const QualificationRouter=require('./api/qualification/qualification.route');
const DesignationRouter=require('./api/designation/designation.route');
const EmpInfoRouter=require('./api/employee_info/employee_info.route');
const InvesmentRouter=require('./api/investment/investment.route');
const PaymentRouter=require('./api/payment/payment.route');
const KycRouter=require('./api/kyc/kyc.route');
const SalaryRouter=require('./api/salary/salary.route');



/***********************************
 *       All Middlewares
 **********************************/

app.use(cors());
app.use(express.json());
app.use(fileUpload());

/********************
 * To serve all files
 ********************/

 app.get('/uploads/images/:id',(req, res)=>{
    id=req.params.id;
    if(fs.existsSync(`${__dirname}/uploads/images/${id}`))
     res.sendFile(`${__dirname}/uploads/images/${id}`);
     else
     res.send('invalid');
});






/***************Api Routings*********************/
app.use("/api/account",AccountRouter);
app.use("/api/customer",CustomerRouter);
app.use("/api/associate",AssociateRouter);
app.use("/api/employee",EmployeeRouter);
app.use("/api/nominee",NomineeRouter);
app.use("/api/qualification",QualificationRouter);
app.use("/api/designation",DesignationRouter);
app.use("/api/emp_info",EmpInfoRouter);
app.use("/api/invesment",InvesmentRouter);
app.use("/api/payment",PaymentRouter);
app.use("/api/kyc",KycRouter);
app.use("/api/salary",SalaryRouter);









/***************Deafult Routings*********************/
app.get("/", (request, response) => {
    response.send("API Documentation");
});


app.post("/test", (request, response) => {

    console.log(request.body);
    console.log(request.files);
        // console.log(request.query.id)
        // console.log(request.params.id)



        response.status(200).json({
        message: "Connection Established"
    });
});



/****************************************
 * To handle all invalid request
 * **************************************/

app.all("*", (request, response) => {
    response.status(500).json({
        message: "invalid request"
    });
});



/*Server Initilization */
app.listen(9000,()=>{
    console.log(`Api Server Running on Port No : 9000`);
});



