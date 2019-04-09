const Controller = require('./emailController');


module.exports ={
    method:'POST',
    path:'/SendEmail',
    handler:Controller.SendEmail

}