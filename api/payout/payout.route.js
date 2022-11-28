const router=require("express").Router();
const {verifyToken}=require('../../auth/tockenValidator');

const {Find_, FindAll_, Add_, Update_,InvesmentPayouts_,UserPayouts_, Remove_ }=require('./payout.controller');

router.get("/:id",verifyToken,Find_);
router.get("/",verifyToken,FindAll_);
router.post("/",verifyToken,Add_);
router.put("/:id",verifyToken,Update_);
router.get("/invesment/:id",verifyToken,InvesmentPayouts_);
router.post("/user",verifyToken,UserPayouts_);
router.get("/:id",verifyToken,Find_);
router.delete("/:id",verifyToken,Remove_); 
 /*To handle all invalid request */  
 router.all("*",(request,response)=>{
        response.status(500).json({ status:"failed", message:"invalid request" }); 
       });  

module.exports=router;