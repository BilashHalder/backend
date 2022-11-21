const router=require("express").Router();

const {Admin,Customer,Associate,Employee}=require('./login.controller');

router.post("/admin",Admin);
router.post("/customer",Customer);
router.post("/associate",Associate);
router.post("/employee",Employee);



 /*To handle all invalid request */  
 router.all("*",(request,response)=>{
        response.status(500).json({ status:"failed", message:"invalid request" }); 
       });  

module.exports=router;