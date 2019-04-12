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
   // const data = request.payload
    const params = {_id: mongoose.Types.ObjectId(request.payload.id)}
    return new Promise((resolve,reject) => 
        countyCollection.findById(params,(err,docs) => {
            if (err) {
          // reject(err)
           console.log(err)
             }else{
               resolve(docs)
             }
        }))
}

const countyRecordUpdate = (req,h) => {
    const Data = req.payload;
    const params = {_id: mongoose.Types.ObjectId(req.params.id)};
    return new Promise((resolve,reject) => {
        const update_data=({county:req.payload.county, city:req.payload.city, state:req.payload.state, zip:req.payload.zip})
        countyCollection.updateOne(params,{$set:update_data},{multi:true},(Data,(err,docs) => {
                if(!err){
                        resolve({status:true,message:"update success"})      
                    }else{
                       resolve({status:false,message:"invalid "})
                    }
            })); 

    })
 }


 
module.exports = {
    countyDetail,
    countyDataList,
    countyRecordUpdate,
    



}
