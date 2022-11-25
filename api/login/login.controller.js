const {findAdnin,findCustomer,findAssociate,findEmployee}=require('./login.services');
const bcrypt = require('bcrypt');
const fs=require('fs');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

var privateKey = 'creazione_2022_private#123'

const {servererror,invalidrequest,updatemessge,datanotfound,deletemsg,imageerror,alreadyused,passerror,invaliddata,invalid}=require('../../locale/en');

const Admin=(request,response)=>{
const {id,pass}=request.body;
if(id==undefined || pass==undefined)
    response.status(500).json({ status:"failed", message:"Please Enter User Id And Password" });
    else{
        findAdnin(id,(err,result)=>{
            if(err)
            response.status(500).json({ message: servererror });
            else if(!result){
            response.status(400).json({ message: "Invalid Email or Phone No" });
            }
            else {
                bcrypt.compare(pass, result.pass,(err, flag)=> {
                    if(err)
                    response.status(500).json({ message: servererror });
                    else if(!flag)
                    response.status(400).json({ message: "Invalid Email or Phone No or Password" });
                    else{ 
                             delete result.pass;
                             var token = jwt.sign({result}, privateKey); 
                             response.status(200).json({ message: "verified",token,id:result.id,info:result });
                    }

                });
            }

        })
    }
}

const Customer=(request,response)=>{
    const {id,pass}=request.body;
    if(id==undefined || pass==undefined)
        response.status(500).json({ status:"failed", message:"Please Enter User Id And Password" });
        else{
            findCustomer(id,(err,result)=>{
                if(err)
                response.status(500).json({ message: servererror });
                else if(!result){
                response.status(400).json({ message: "Invalid Email or Phone No" });
                }
                else {
                    bcrypt.compare(pass, result.pass,(err, flag)=> {
                        if(err)
                        response.status(500).json({ message: servererror });
                        else if(!flag)
                        response.status(400).json({ message: "Invalid Email or Phone No or Password" });
                        else{ 
                                 delete result.pass;
                                 var token = jwt.sign({result}, privateKey); 
                                 response.status(200).json({ message: "verified",token,id:result.id,info:result });
                        }
    
                    });
                }
    
            })
        }
}

const Associate=(request,response)=>{
    const {id,pass}=request.body;
if(id==undefined || pass==undefined)
    response.status(500).json({ status:"failed", message:"Please Enter User Id And Password" });
    else{
        findAssociate(id,(err,result)=>{
            if(err)
            response.status(500).json({ message: servererror });
            else if(!result){
            response.status(400).json({ message: "Invalid Email or Phone No" });
            }
            else {
                bcrypt.compare(pass, result.pass,(err, flag)=> {
                    if(err)
                    response.status(500).json({ message: servererror });
                    else if(!flag)
                    response.status(400).json({ message: "Invalid Email or Phone No or Password" });
                    else{ 
                             delete result.pass;
                             var token = jwt.sign({result}, privateKey); 
                             response.status(200).json({ message: "verified",token,id:result.id,infro:result });
                    }

                });
            }

        })
    }
}

const Employee=(request,response)=>{
    const {id,pass}=request.body;
if(id==undefined || pass==undefined)
    response.status(500).json({ status:"failed", message:"Please Enter User Id And Password" });
    else{
        findEmployee(id,(err,result)=>{
            if(err)
            response.status(500).json({ message: servererror });
            else if(!result){
            response.status(400).json({ message: "Invalid Email or Phone No" });
            }
            else {
                bcrypt.compare(pass, result.pass,(err, flag)=> {
                    if(err)
                    response.status(500).json({ message: servererror });
                    else if(!flag)
                    response.status(400).json({ message: "Invalid Email or Phone No or Password" });
                    else{ 
                             delete result.pass;
                             var token = jwt.sign({result}, privateKey); 
                             response.status(200).json({ message: "verified",token,id:result.id,info:result });
                         }

                });
            }

        })
    }
}

module.exports={Admin,Customer,Associate,Employee}