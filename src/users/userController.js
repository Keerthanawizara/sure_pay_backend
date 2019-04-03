const userCollection = require('./userModel')
const userAuthentication = require('../common/authenticator')
const uuid = require('uuid/v1')
const Joi = require('joi');

const userAuthController = (req) => {
    const userCredentials = req.payload
    return new Promise((resolve, reject)=> {
        userCollection.find(userCredentials).toArray((err,docs) => {
            if(user[0]['_id']) {
                const userAuthToken = new userAuthentication()
                userAuthToken.setToken(uuid())
                return resolve ({ login: "success", token: userAuthToken.getToken() })
            }else {
             return resolve ({ login: "failure", status: "user not available" })                
            }
        })
})
}

//joi validation 
const createUser = (req,h) => {
     var data = req.payload
    const schema = Joi.object().keys({
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/) 
     }).with('username', 'password');
        return new Promise((resolve, reject) => {
            userCollection.create({
                username  : req.payload.username,
                password : req.payload.password,        
            },  
            Joi.validate(data, schema, (err,docs)=> {
                if (err) reject(err);
                else resolve(docs);
            }));
        });
}



module.exports = {
    createUser,
    userAuthController
    
}