const userCollection = require('./userModel')
const userAuthentication = require('../common/authenticator')
const uuidv1 = require('uuid/v1')
const Joi = require('joi');


//server side data validation initialize

const schema = Joi.object().keys({
    username: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/) 
 }).with('username', 'password');


//create user API
const createUser = (req,h) => {
     var data = req.payload
        return new Promise((resolve, reject) => {
            userCollection.create(req.payload,
            Joi.validate(data, schema, (err,docs)=> {
                if (err) reject(err);
                else resolve(docs);
            }));
        });
}
//GetUserList
const GetUserList = (request,h) => {
    return new Promise((resolve,reject) => 
        userCollection.paginate({},{offset:0, limit:15},(err,docs) => {
            if (err) {
           reject(err)
           console.log(err)
             }else{
               resolve(docs)
             }
        }))
}


//user login Api


const userAuthController = (req,h) => {
    const userCredentials = req.payload
   // console.log(userCredentials)
    return new Promise((resolve, reject)=> {
        userCollection.find(userCredentials),((err,docs) => {
            if(user[0]['_id']) {
                const userAuthToken = new userAuthentication()
                userAuthToken.setToken(uuid())
                return resolve ({ login: "success", token: userAuthToken.getToken() })
            }else {
              return reject(err)             
            }
        })
})
}
    

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



module.exports = {
    createUser,
    userAuthController,
    GetUserList
    
}