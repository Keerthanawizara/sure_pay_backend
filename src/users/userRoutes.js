const userDataController = require('./userController')

module.exports = [
    {method: 'GET',path: '/',handler: userDataController}
]