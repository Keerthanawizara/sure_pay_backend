const dbConfig = require('../dbConfig')
const mongojs = require('mongojs')
const jwt = require('jsonwebtoken');

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


//Create token function
const GenerateToken=(data,callback)=>{
    console.log(token)
    console.log(data);return;

}
  
//user login 
const loginUserController =  (request, h) => {
    const db = mongojs(dbConfig.db)
           return new Promise((resolve, reject)=> {
               db.collection(dbConfig.collection).find(request.payload).toArray((err, docs) => {
              if(err){
              return reject(err)
              }if(docs.length===0){
                  resolve({status:false,statuscode:400,message:"invalid username or password"})
              }else{
                  GenerateToken((err,res)=>{
                     console.log(res)
                      //resolve({status:true,statuscode:200,message:"user available",data:docs})
                  })
              }
            }); 
        })

    };

module.exports = {
     userDataController,
     loginUserController
}