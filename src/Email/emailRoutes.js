const Controller = require('./emailController')

module.exports = 
    {method: 'POST',
     path: '/sendEmail', 
     handler: Controller.SendMail
    }