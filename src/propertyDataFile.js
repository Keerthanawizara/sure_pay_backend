const csv = require('csv-parser')
const fs = require('fs')
var csvFile = require('../home/wizra/document/propertyData')
const results = [];
 
fs.createReadStream("property.csv")
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
  });