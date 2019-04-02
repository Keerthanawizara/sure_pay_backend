// const userDataModel = require('./userModel')
// const userAuthentication = require('../common/authenticator')
// const uuid = require('uuid/v1')

// const userAuthController = async (request) => {
//     const userCredentials = request.payload
//     try {
//         if (userCredentials.username && userCredentials.password) {
//             const userAuth = new userDataModel(userCredentials.username, userCredentials.password)
//             const user = await userAuth.findUser()
//             if (user[0]['_id']) {
//                 const userAuthToken = new userAuthentication()
//                 userAuthToken.setToken(uuid())
//                 return { login: "success", token: userAuthToken.getToken() }
//             } else {
//                 return { login: "failure", status: "user not available" }
//             }
//         } else {
//             return { login: "failure" }
//         }
//     } catch (e) {
//         return e
//     }
// }

// const userDataController = async (request) => {
//     return "Hello"
// } 

// module.exports = { userAuthController, userDataController }

const userCollection = require('./userModel');
const Joi = require('joi');

const createUser = (req,h) => {
    let data = req.payload
    const schema = Joi.object().keys({
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/) 
     }).with('username', 'password');
     //validate: ()=> {
            Joi.validate(data, schema, (err) =>{
                console.log(data)
                console.log(schema)
                if (err) {
                throw (err)
                 } else {
                    return new Promises((resolve, reject) => {
                    userCollection.create({
                        username   : req.payload.username,
                        password : req.payload.password,        
                    },  
                    ((err,docs) => {
                        if (err) {  
                         console.log(err)
                          reject(err)
                         }else 
                         resolve(docs)
                        console.log|(docs)
                  
                  }))
                
                })
            };
        });
    //}
}
// const userCollection = require('./userModel');
// const createUser = (req,h) => {
//     return new Promise((resolve,reject) => {
//                    userCollection.create({
//                        username  : req.payload.username,
//                        password : req.payload.password,        
//                    },  
//                    ((err,docs) => {
//                        if (err) {
//                    //console.log(err)  
//                   return reject(err)
//                         }else resolve(docs)
//                    }))
//                })
//            }


module.exports = {
    createUser
}