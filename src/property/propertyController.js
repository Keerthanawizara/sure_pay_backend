//const dbConfig = require('../dbConfig')
const propertyCollection = require('./propertyModel');
const mongoose = require('mongoose');

//create property detail API

const propertyDetail = (req,h) => {
 return new Promise((resolve,reject) => {
                'property'.create({
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
                console.log(err)  
                //return reject(err)
                     }else resolve(docs)
                }))
            })
        }


// // property table List Page

const propertyDataList = (request,h) => {
    const propertyData = () => {
        return new Promise((resolve,reject) => 
            property.find().limit(10).toArray((err,docs) => {
                if (err) 
                //reject(err)
                console.log(err)
                resolve(docs)
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
            property.findOne(
                params,
                {$set: query},((err,docs) => {
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
     const params = {_id: mongoose.Types.ObjectId(req.params.id),
                  pin:JSON.parse(query.pin)}; 
        return new Promise((resolve,reject) => {
            property.update(
                params,
                {$set: query},((err,docs) => {
                    if(err){
                        console.log(err)
                        //reject(err)
                    }else{
                       resolve({status:true,message:"update success"})
                    }
                })); 

        })
    }
// // delete property details

  const propertyRecordDelete = (req,h) => {
    
    const query = req.query;
   console.log(req.query)
   const params = {_id: mongoose.Types.ObjectId(req.params.id),
              pin:JSON.parse(query.pin)}; 
    return new Promise((resolve,reject) => {
        property.delete(
            params,
            {$set: query},((err,docs) => {
                if(err){
                    //console.log(err)
                   reject(err)
                }else{
                    console.log(docs)
                   resolve({status:true,message:"deleted success"})
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