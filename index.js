const hapi = require('hapi')
const routes = require('./src/users/userRoutes')
const propertyroutes = require('./src/property/propertyRoutes')

const server = hapi.server({
    port: 9000
    ,
    host: 'localhost'
})

const init = async () => {
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
