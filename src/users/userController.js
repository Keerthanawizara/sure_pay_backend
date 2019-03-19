const dbConfig = require('../dbConfig')
const mongojs = require('mongojs')
const jwt = require('jsonwebtoken');

// table List Page

const userDataController = (request,h) => {
    const db = mongojs(dbConfig.db)
    const userData = () => {
        return new Promise((resolve,reject) => 
            db.collection(dbConfig.collection).find().limit(2).toArray((err,docs) => {
                if (err) reject(err)
                resolve(docs)
            }))
    }
    return userData().then(res => res).catch(err => err)
}

// //Create token function
// const GenerateToken=(data,callback)=>{
//     var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//     console.log(token)
//     console.log(data);return;

//}
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
                  //GenerateToken(doc,(err,res)=>{

                      resolve({status:true,statuscode:200,message:"user available",data:docs})
                  //})
              }
            }); 
        })

    };
  // create property details

    const propertyDetail = (req,h) => {
        const db = mongojs(dbConfig.db)
            return new Promise((resolve,reject) => {
                db.collection(dbConfig.collection).insert({
                    country: req.payload.country,
                    pin   : req.payload.pin,
                    address: req.payload.address,
                    city   : req.payload.city,
                    state  : req.payload.state,
                    zip    : req.payload.zip,
                    township : req.payload.township,
                    class_code : req.payload.class_code,
                    assessed_value : req.payload.assessed_value,
                    market_value : req.payload.market_value,
                    taxes_per_year : req.payload.taxes_per_year,
                    PREEQEXM : req.payload.PREEQEXM,
                    home_owners: req.payload.home_owners,
                    senior_exemption : req.payload.senior_exemption,
                    senior_freeze : req.payload.senior_freeze,
                    total_acres: req.payload.total_acres,
                    legal_description: req.payload.legal_description,
                    google_map_view: req.payload.google_map_view
                },  
                ((err,docs) => {
                    if (err) {
                   return reject(err)
                     }else resolve(docs)
                }))
            })
        }
//propertyDetail/{pin}
const propertyRecord = (req,h) => {
        const db = mongojs(dbConfig.db)

        const query = req.query;

     const params = {_id: mongojs.ObjectId(req.params.id),
                  pin:JSON.parse(query.pin)}; 
        return new Promise((resolve,reject) => {
            db.collection(dbConfig.collection).findOne(
                params,
                {$set: query},((err,docs) => {
                    if(err){
                        reject(err)
                    }else{
                       resolve({status:true,message:" get one user"})
                    }
                })); 

        })
    }
    
    //update property details
    const propertyRecordUpdate = (req,h) => {
        const db = mongojs(dbConfig.db)

        const query = req.query;

     const params = {_id: mongojs.ObjectId(req.params.id),
                  pin:JSON.parse(query.pin)}; 
        return new Promise((resolve,reject) => {
            db.collection(dbConfig.collection).update(
                params,
                {$set: query},((err,docs) => {
                    if(err){
                        reject(err)
                    }else{
                       resolve({status:true,message:"update success"})
                    }
                })); 

        })
    }
// delete property details
  const propertyRecordDelete = (req,h) => {
    const db = mongojs(dbConfig.db)

    const query = req.query;

   const params = {_id: mongojs.ObjectId(req.params.id),
              pin:JSON.parse(query.pin)}; 
    return new Promise((resolve,reject) => {
        db.collection(dbConfig.collection).remove(
            params,
            {$set: query},((err,docs) => {
                if(err){
                    reject(err)
                }else{
                   resolve({status:true,message:"deleted success"})
                }
            })); 

    })
  }




module.exports = {
    userDataController: userDataController,
     loginUserController,
     propertyDetail,
     propertyRecord,
     propertyRecordUpdate,
     propertyRecordDelete



}