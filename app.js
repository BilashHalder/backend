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
const LoginRouter=require('./api/login/login.route');
const DepositRouter=require('./api/deposit/deposit.route');
const PayoutRouter=require('./api/payout/payout.route');
const RequestRouter=require('./api/request/request.route');
const WorkReportRouter=require('./api/report/report.route');
const LeaveRouter=require('./api/leave/leave.route');
const LeaveRemainRouter=require('./api/leave_remain/leave_remain_route');
const LeaveApplication=require('./api/leave_application/leave_app.route');
const HolidaysRouter=require('./api/holidays/holidays.router');





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
     res.json({message:"Invalid Resouse Request"});
});


app.get('/uploads/documents/:id',(req, res)=>{
    id=req.params.id;
    if(fs.existsSync(`${__dirname}/uploads/documents/${id}`))
     res.sendFile(`${__dirname}/uploads/documents/${id}`);
     else
     res.json({message:"Invalid Resouse Request"});
});


app.get('/uploads/others/:id',(req, res)=>{
    id=req.params.id;
    if(fs.existsSync(`${__dirname}/uploads/others/${id}`))
     res.sendFile(`${__dirname}/uploads/others/${id}`);
     else
     res.json({message:"Invalid Resouse Request"});
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
app.use("/api/login",LoginRouter);
app.use("/api/deposit",DepositRouter);
app.use("/api/payout",PayoutRouter);
app.use("/api/others",RequestRouter);
app.use("/api/report",WorkReportRouter);
app.use("/api/leave",LeaveRouter);
app.use("/api/leave_remain",LeaveRemainRouter);
app.use("/api/leave_application",LeaveApplication);
app.use("/api/holidays",HolidaysRouter);





/***************Deafult Routings*********************/
app.get("/", (request, response) => {
    response.send("API Documentation");
});


app.get("/status", (request, response) => {
        response.status(200).json({
        message: "Connection Established"
    });
});


app.post("/test", (request, response) => {
    response.status(200).json({data:request.body});
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
    console.log(`Api Server Running on Port No http://localhost:9000/api/`);
});

