const router=require("express").Router();
const {verifyToken}=require('../../auth/tockenValidator');

const {FindAllInvesments_,FindAllSalary_,FindAllWithdrawal_,FindInvesmentPayouts_,FindUserWithdrwals_ }=require('./payout.controller');




router.get("/invesments",verifyToken,FindAllInvesments_);
router.get("/salary",verifyToken,FindAllSalary_);
router.get("/withdrawals",verifyToken,FindAllWithdrawal_);
router.post("/withdrawals/user",verifyToken,FindAllWithdrawal_);
router.get("/invesment/:id",verifyToken,FindInvesmentPayouts_);




 /*To handle all invalid request */  
 router.all("*",(request,response)=>{
        response.status(500).json({ status:"failed", message:"invalid request" }); 
       });  

module.exports=router;