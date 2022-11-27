const {verify}=require('jsonwebtoken');
var privateKey = 'creazione_2022_private#123'
module.exports={
    verifyToken:(request,response,next)=>{
        let token=request.get('authorization');
        if(token)
        {
            token=token.slice(7);
            verify(token,privateKey,(err,res)=>{
                if(err)
                response.status(500).json({ message: 'Invalid Token' });
                else
                next();
            });
        }
       else{
        response.status(400).json({ message: 'Unauthorized access' });
       }

    }
}
