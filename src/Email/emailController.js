var nodemailer = require('nodemailer');
const emailCollection = require('./emailModel');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
         user: process.env.EMAIL,
         pass: process.env.PASSWORD
    }
});

    const  sendEmail = (req,h) => {
       var mailOptions= req.payload
       var parseData = JSON.parse(mailoptions)
       //console.log(mailOptions)
      return new Promise((resolve,reject)=>{
      emailCollection.create(req.payload,
      transporter.sendMail(mailOptions,parseData,(error, info)=>{
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
module.exports = sendEmail