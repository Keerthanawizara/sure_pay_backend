const dbConfig = require('../dbConfig')
const mongojs = require('mongojs')
const jwt = require('jsonwebtoken');


const userDataController = (request,h) => {
    const db = mongojs(dbConfig.db)
    const userData = () => {
        return new Promise((resolve,reject) => 
            db.collection(dbConfig.collection).find((err,docs) => {
                if (err) reject(err)
                resolve(docs)
            }))
    }
    return userData().then(res => res).catch(err => err)
}

const loginUserController =  (request, h) => {

    if(request.payload && request.payload.username && request.payload.password) {
        let username= request.payload.username;
        let password = request.payload.password;
    const db = mongojs(dbConfig.db)
       const loginUser = () => {
           return new Promise((resolve, reject)=> 
           db.collection(dbConfig.collection).find({ 'username': username, 'password':password }).toArray((err, docs) => {
            if (err) reject(err)
            resolve(docs)
        }))
                    
       }
      return loginUser().then((user) => { 
          console.log('****************')
          console.log("the db is " + user)
        if( ! user) {
            console.log(h.response)
           return h.response({code : 1, message:"no such user found!"});
        } 
       //console.log (JSON.stringify(user));
       //var user = {};
      let dbjson = JSON.parse(JSON.stringify(user));

      console.dir("number of enteries: " + dbjson)
   console.log("password in db : " + dbjson.password)
    console.log("password given by enduser: " + request.payload.password)
        //   let items = user[item]
        //   for(var i = 0; i < items.length; ++i) {
        //     if(items[i].password === password)
        //         return items[i];
        //   }
        if(user.password === request.payload.password) {
            let payload = {id: user.id};
            let token = jwt.sign(payload, 'SECRET_KEY' );
            return h.response({message: "ok", token: token});
        } else {
            console.log('************')
           return h.response({message:"passwords did not match!"});
        }
    })

      }
    
    };
module.exports = {
    userDataController : userDataController,
    loginUserController : loginUserController
}