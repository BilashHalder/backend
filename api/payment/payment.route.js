const router=require("express").Router();
const {Find_,FindAll_,Add_,Update_,Remove_,Users_}=require('./payment.controller');
const {verifyToken}=require('../../auth/tockenValidator');

router.get("/:id",verifyToken,Find_);
router.get("/",verifyToken,FindAll_);
router.post("/",verifyToken,Add_);
router.put("/:id",verifyToken,Update_);
router.delete("/:id",verifyToken,Remove_);
router.post("/user",verifyToken,Users_);

 /*To handle all invalid request */  
 router.all("*",(request,response)=>{
        response.status(500).json({ status:"failed", message:"invalid request" }); 
       });  

module.exports=router;