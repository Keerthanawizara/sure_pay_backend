var nodemailer = require('nodemailer');
//const mailer =require('../src/dbConfig').mailer();


  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'keerthirajme@gmail.com',
        pass: 'rajendran5'
      }
    });
  

const SendEmail = (req,h)=>{
    var mailOptions = {
        from: 'keerthirajme@gmail.com',
        to: 'keerthana@wizara.app',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.export ={
    SendEmail
}