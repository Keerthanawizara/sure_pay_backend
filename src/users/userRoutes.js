const Controller = require('./userController')

module.exports = [
    {method: 'GET',path: '/',handler: Controller.userDataController},
    {method: 'POST',path: '/loginUser', handler: Controller.loginUserController},
    {method: 'POST', path: '/propertyDetail', handler: Controller.propertyDetail},
    {method: 'GET', path: '/propertyRecord/{id}', handler: Controller.propertyRecord},
    {method: 'PUT', path: '/propertyRecordUpdate/{id}', handler: Controller. propertyRecordUpdate},
    {method: 'DELETE', path: '/propertyRecordDelete/{id}', handler: Controller. propertyRecordDelete},

];
