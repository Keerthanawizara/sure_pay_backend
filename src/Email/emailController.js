var nodemailer = require('nodemailer');
const emailCollection = require('./emailModel');
require('dotenv').config();

//const mailer =require('../src/dbConfig').mailer();
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWOAD
    }
});
//const SendMail = async (req,h) => {
    // var mailOptions = {
    //     // from: req.payload.from,
    //     // to: req.payload.to,
    //     // subject: req.payload.subject,
    //     // text:req.payload.text
    //     from: "keerthirajme@gmail.com",
    //     to:"r.keethanait2@gmail.com",
    //     subject: "node mail",
    //     text:"hai"
    //   };
      //console.log(mailOptions)
   const  SendMail = (req,h) => {
       var mailOptions= req.payload
      return new promise((resolve,reject)=>{
      emailCollection.create(req.payload,
      transporter.sendMail(mailOptions,(error, info)=>{
        if (error) {
          //console.log(error);
          reject(error)
        } else {
          //console.log('Email sent: ' + info.response);
          resolve(info)
        }
     }))
      });
}
module.export ={
    SendMail
}