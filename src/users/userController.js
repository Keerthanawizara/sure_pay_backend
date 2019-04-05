const userCollection = require('./userModel')
const userAuthentication = require('../common/authenticator')
const uuid = require('uuid/v1')
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

//user login Api

const userAuthController = (req) => {
    console.log("hii")
    const userCredentials = req.payload
    console.log(userCredentials)
    return new Promise((resolve, reject)=> {
        userCollection.find(userCredentials).toArray((err,docs) => {
            if(user[0]['_id']) {
                const userAuthToken = new userAuthentication()
                console.log(userAuthToken)
                userAuthToken.setToken(uuid())
                return resolve ({ login: "success", token: userAuthToken.getToken() })
            }else {
             return resolve ({ login: "failure", status: "user not available" })                
            }
        })
})
}


module.exports = {
    createUser,
    userAuthController
    
}