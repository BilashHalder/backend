const router=require("express").Router();
const {verifyToken}=require('../../auth/tockenValidator');

const {Find_,FindAll_,Add_,Update_,Remove_,RemainEmployee_}=require('./leave_remain.controller');

router.get("/:id",verifyToken,Find_);
router.get("/",verifyToken,FindAll_);
router.get("/employee/:id",verifyToken,RemainEmployee_);
router.post("/",verifyToken,Add_);
router.put("/:id",verifyToken,Update_);
router.delete("/:id",verifyToken,Remove_);

 /*To handle all invalid request */  
 router.all("*",(request,response)=>{
        response.status(500).json({ status:"failed", message:"invalid request" }); 
       });  

module.exports=router;