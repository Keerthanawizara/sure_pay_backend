const propertyCollection = require('./propertyModel');
const mongoose = require('mongoose');
const Joi = require('joi');


//server side Data validation initialize

const schema = Joi.object().keys({
    country: Joi.string(),
    pin: Joi.string(),
    address: Joi.string(),
    city: Joi.string(),
    state:Joi.string(),
    zip: Joi.string(),
    township:Joi.string(),
    class_code: Joi.string(),
    assessed_value: Joi.string(),
    market_value: Joi.string(),
    taxes_per_year: Joi.string(),
    PREEQEXM: Joi.string(),
    home_owners: Joi.string(),
    senior_exemption: Joi.string(),
    senior_freeze: Joi.string(),
    total_acres:  Joi.string(),
    legal_description: Joi.string(),
    google_map_view:  Joi.string() 
 })


//create API initialize

const propertyDetail = (req,h) => {
    var data = req.payload
       return new Promise((resolve, reject) => {
        propertyCollection.create(req.payload,
           Joi.validate(data, schema, (err,docs)=> {
               if (err) 
                 reject(err);
               else resolve(docs);
           }));
       });
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