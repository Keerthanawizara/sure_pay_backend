const countyCollection = require('./countyModel');
const mongoose = require('mongoose');
const Joi = require('joi');


const schema = Joi.object().keys({
    county:Joi.string(),
    city: Joi.string(),
    state:Joi.string(),
    zip: Joi.string()
})

//create api with joi validation 
const countyDetail = (req,h) => {
    var data = req.payload
       return new Promise((resolve, reject) => {
           countyCollection.create(req.payload,
           Joi.validate(data, schema, (err,docs)=> {
               if (err) reject(err);
               else resolve(docs);
           }));
       });
}
// payment table List Page

const countyDataList = (request,h) => {
    return new Promise((resolve,reject) => 
        countyCollection.paginate({},{offset:0, limit:15},(err,docs) => {
            if (err) {
           reject(err)
           //console.log(err)
             }else{
               resolve(docs)
             }
        }))
}
const countyRecordUpdate = (req,h) => {
        
    const Data = req.payload;
    return new Promise((resolve,reject) => {
        countyCollection.updateOne(
            {$set:{name:user.name,state:user.state}},{multi:true,new:true},(Data,(err,docs) => {
                if(!err){
                        resolve({status:true,message:"update success"})
                    }else{
                        resolve({status:false,message:"invalid "})
                    }
            })); 

    })
 }
 const countyRecord = (req,h) => {
    const query = req.payload;
    const params = {_id: mongoose.Types.ObjectId(req.params.id),pin:query.pin};  
        return new Promise((resolve,reject) => {
            countyCollection.findOne(
                params,
                ((err,docs) => {
                    if(err){
                      // console.log(err)
                       reject(err)
                    }else{
                      resolve(docs)
                    }
                })); 

        })
            
    }

module.exports = {
    countyDetail,
    countyDataList,
    countyRecordUpdate,
     countyRecord



}
