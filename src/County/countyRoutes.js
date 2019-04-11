const CountyCtrl = require('./countyController')


module.exports = [

   { method: 'POST', path: '/countyDetail', handler: CountyCtrl.countyDetail},
   {method: 'GET',path: '/countyDataList',handler: CountyCtrl.countyDataList},
   {method: 'POST', path: '/countyRecordUpdate', handler: CountyCtrl. countyRecordUpdate},
]