const hapi = require('hapi')
const routes = require('./src/users/userRoutes')
const propertyroutes = require('./src/property/propertyRoutes')
const AuthBearer = require('hapi-auth-bearer-token');


const server = hapi.server({
    port: '5500'
    ,
    host: 'localhost'
})

const init = async () => {

    await server.register(AuthBearer);
 
     server.auth.strategy('simple', 'bearer-access-token', {
    allowQueryToken: true,              // optional, false by default
    validate: async (request, token, h) => {

        // here is where you validate your token
        // comparing with token from your database for example
        const isValid = token === '1234';

        const credentials = { token };
        const artifacts = { test: 'info' };

        return { isValid, credentials, artifacts };
    }
});  // 

    await server.start()
    console.log( `Server running at ${server.info.uri}`)
}


server.route(routes)
server.route(propertyroutes)

process.on('unhandledRejection',(err) => {
    console.log(err)
    process.exit(1)
})

init();
