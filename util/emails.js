var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({service: 'gmail', auth: { user: 'support@creazionegroup.in',pass: 'ffqbthitvnnsprng'}});
const {registration}=require('../template/email/emailTemplates')



var options = {
  from: 'support@creazionegroup.in',
  to: 'ibilashhalder@gmail.com',
  subject: 'Sending Email using Node.js',
  html: registration({name:"bilash",other:'nothing'})
};

transporter.sendMail(options, (error, info)=>{
  if (error) {
    console.log(error);
  } else {
    console.log(info);
  }
});






