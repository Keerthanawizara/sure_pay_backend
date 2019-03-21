const Controller = require('./userController')
module.exports = [
    {method: 'GET',path: '/',handler: Controller.userDataController},
    {method: 'POST',path: '/loginUser', handler: Controller.loginUserController},
];
