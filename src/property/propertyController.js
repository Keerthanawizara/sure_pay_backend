const propertyCollection = require('./propertyModel');
const mongoose = require('mongoose');

//create property detail API

const propertyDetail = (req,h) => {
 return new Promise((resolve,reject) => {
    propertyCollection.create(req.payload,  
                ((err,docs) => {
                    if (err) {
               // console.log(err)  
                return reject(err)
                     }else resolve(docs)
                }))
            })
        }


// // property table List Page

const propertyDataList = (request,h) => {
    const propertyData = () => {
        return new Promise((resolve,reject) => 
            propertyCollection.paginate({}, { page: 1, limit: 3 },(err,docs) => {
                if (err) {
                reject(err)
               // console.log(err)
                 }else{
                   resolve(docs)
                 }
            }))
    }
    return propertyData().then(res => res).catch(err => err)
}


 //propertyDetail/{pin}
const propertyRecord = (req,h) => {
        const query = req.query;

     const params = {_id: mongoose.Types.ObjectId(req.params.id),
                  pin:JSON.parse(query.pin)}; 
        return new Promise((resolve,reject) => {
            propertyCollection.findOne(
                params,
                  ((err,docs) => {
                    if(err){
                        //console.log(err)
                       reject(err)
                    }else{
                       resolve({status:true,message:" get one user"})
                       //console.log(docs)
                    }
                })); 

        })
    }
    
//     //update property details

    const propertyRecordUpdate = (req,h) => {
        const query = req.query;
        const params = {_id: mongoose.Types.ObjectId(req.params.id),pin:query.pin};
        // console.log(params)

     const update_data={state:query.state}
        return new Promise((resolve,reject) => {
            propertyCollection.updateOne(
                params,
                { $set: update_data },((err,docs) => {
                    if(!err){
                        if(docs.count>0){
                            resolve({status:true,message:"update success"})
                        }else{
                            resolve({status:false,message:"invalid pin or id"})
                        }
                     }
                })); 

        })
    }
// // delete property details

  const propertyRecordDelete = (req,h) => {
    const query = req.query;
    console.log(req.query)
  const params = {_id: mongoose.Types.ObjectId(req.params.id),pin:query.pin};
  console.log(params)
     return new Promise((resolve) => {
         propertyCollection.deleteOne(
             params,((err,docs) => {
                 if(!err){
                    if(docs.count>0){
                        //console.log(err)
                        //resolve(err)
                       resolve({status:true,message:"delete success"})
                    }else{
                        //resolve(docs)
                        resolve({status:false,message:"invalid pin or id"})
                    }
                 }
                })); 
     })
  }

  



module.exports = {
     propertyDataList,
     propertyDetail,
     propertyRecord,
     propertyRecordUpdate,
     propertyRecordDelete



}