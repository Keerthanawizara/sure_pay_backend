const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
console.log("mongodb connected successfully");
module.exports = {
    MongoClient: MongoClient,
    url: url,
    db: 'users',
    collection: [
        {
            user: 'userCollection',
            property: 'propertyCollection'
        }
    ]
}