const hapi = require('hapi')
require('./src/dbConfig').dbconfig();
//const userroutes = require('./src/users/userRoutes')
const propertyroutes = require('./src/property/propertyRoutes')
const paymentroutes = require('./src/payment/paymentRoutes')
const countyroutes = require('./src/County/countyRoutes')

//const AuthBearer = require('hapi-auth-bearer-token');
 const mailroutes = require('./src/Email/emailRoutes')
 //console.log(countyroutes)

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
server.route(countyroutes)

process.on('unhandledRejection',(err) => {
    console.log(err)
    process.exit(1)
})

init()



