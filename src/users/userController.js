const dbConfig = require('../dbConfig')
const mongojs = require('mongojs')
const uuid = require('uuid');
const AuthBearer = require('hapi-auth-bearer-token');
const uuidv1 = require('uuid/v1');

//

const userDataController = (request,h) => {
    const db = mongojs(dbConfig.db)
    const userData = () => {
        return new Promise((resolve,reject) => 
            db.collection(dbConfig.collection).find().toArray((err,docs) => {
                if (err) reject(err)
                resolve(docs)
            }))
    }
    return userData().then(res => res).catch(err => err)
}
// //generate token
const GenerateToken = () => {
    return uuidv1(); 
}

  //insert api
//   const userTokenCollection = (user_id, token) => {
//     const db = mongojs(dbConfig.db)
//         return new Promise((resolve,reject) => {
//             db.collection(dbConfig.collection).insert({
//                 user_id : req.params.user_id ,
//                 Token   : re           

  
//user login
const loginUserController =  async (request, h) => {
    const db = mongojs(dbConfig.db)
    //console.log(dbConfig.db)
           return new Promise((resolve, reject)=> {
               db.collection("userCollection").find(request.payload).toArray((err, docs) => {
            
              if(err){

              return reject(err)
              }if(docs.length===0){
                  resolve({status:false,statuscode:400,message:"invalid username or password"})
              }else{
                  let token = GenerateToken(); 
                          
                  resolve({status:true,statuscode:200,message:"user available",data:token,expiresIn: 120})
              }
            }); 
        })

    };

module.exports = {
     userDataController,
     loginUserController
}