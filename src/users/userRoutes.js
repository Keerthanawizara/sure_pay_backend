const userCtrl = require('./userController')

module.exports = [
    {
        method: 'POST',
        path: '/',
        config: { auth: false },
        handler: userCtrl.userAuthController
    },
    {
        method: 'GET',
        path: '/userList',
        handler: userCtrl.userDataController
    }

]