const router=require("express").Router();
const {verifyToken}=require('../../auth/tockenValidator');

const {Find_,FindAll_,Add_,Update_,Remove_,FindEmployee_,Accept_,Reject_}=require('./leave_app.controller');

router.get("/:id",verifyToken,Find_);
router.get("/",verifyToken,FindAll_);
router.post("/",verifyToken,Add_);
router.put("/:id",verifyToken,Update_);
router.delete("/:id",verifyToken,Remove_);
router.get("/employee/:id",verifyToken,FindEmployee_);
router.get("/accept/:id",verifyToken,Accept_);
router.get("/reject/:id",verifyToken,Reject_);

 /*To handle all invalid request */  
 router.all("*",(request,response)=>{
        response.status(500).json({ status:"failed", message:"invalid request" }); 
       });  

module.exports=router;