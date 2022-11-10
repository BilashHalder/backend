var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({service: 'gmail', auth: { user: 'support@creazionegroup.in',pass: 'ffqbthitvnnsprng'}});

const {transaction}=require('./emailtemplates');
let html=transaction({name:'Test User',transaction_id:'717717717177171',amount:50000,date:'22/11/2022'});
const options={
    to:'ibilashhalder@gmail.com',
    subject:'Mail Sended From Creazione Group',
    html:html
}

const sendInvoice=(data)=>{
    var mailOptions = {
        from: 'support@creazionegroup.in',
        ...data
      };
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error) 
          console.log(error);
         else 
          console.log('Email sent: ' + info.response);
        
      });

  }




