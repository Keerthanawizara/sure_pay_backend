const hapi = require('hapi')
// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "keerthirajme@gmail.com",
//         pass: "rajendran5"
//     }
// });

require('./src/dbConfig').dbconfig();
//const userroutes = require('./src/users/userRoutes')
const propertyroutes = require('./src/property/propertyRoutes')
const paymentroutes = require('./src/payment/paymentRoutes')
//const AuthBearer = require('hapi-auth-bearer-token');
 const mailroutes = require('./src/Email/emailRoutes')
//const userAuthentication = require('./src/common/authenticator')

// const uuid = require('uuid/v1')

// const authTokenValidator = async (request, token, h) => {
//     const userAuthToken = new userAuthentication()
//     const isValid = token === userAuthToken.getToken()
//     const credentials = { token }
//     const artifacts = { test: 'info' }
//     return { isValid, credentials, artifacts };
// }

const server = hapi.server({
    port: 8000,
    host: 'localhost'
});
// server.route({
//     method: 'POST',
//     path:'/sendMail',
//     handler: (req, h) => {
//         var mailOptions = {
//             from: req.payload.from,
//             to: req.payload.from,
//             subject: req.payload.subject,
//             text:req.payload.text
//           };  
//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               console.log(error);
//             } else {
//               console.log('Email sent: ' + info.response);
//             }
//           });
       
//     }
// });

const init = async () => {
//     await server.register(AuthBearer)
//     server.auth.strategy('simple', 'bearer-access-token', {
//         allowMultipleHeaders: true,
//         validate: authTokenValidator
//     })
//    server.auth.default('simple')
    await server.start()
    console.log( `Server running at ${server.info.uri}`)
    
}

server.route(propertyroutes)
server.route(paymentroutes)
//server.route(userroutes)
server.route(mailroutes)

process.on('unhandledRejection',(err) => {
    console.log(err)
    process.exit(1)
})

init()



