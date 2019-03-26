const dbConfig = require('../dbConfig')
const mongojs = require('mongojs')

class userDataModel {
    constructor(username, password) {
        console.log(this.db)
        this.db = mongojs(dbConfig.db)
        console.log(this.db)
        console.log(dbConfig.db)
        this.username = username
        console.log(this.username)
        this.password = password
    }
    findUser() {
        return new Promise((resolve,reject) => 
            this.db.collection("userCollection")
            .find({username: this.username, password: this.password},
            (err,docs) => err ? reject(err) : resolve(docs)))
    }
}

module.exports = userDataModel