const paymentCollection = require('./paymentModel');
const mongoose = require('mongoose');
const Joi = require('joi');

// server side Data validation initialize

const schema = Joi.object().keys({
    pin: Joi.string().required(),
   payment: Joi.string().required() 
}).with('pin', 'payment');

//create api with joi validation 
const paymentDetail = (req,h) => {
    var data = req.payload
       return new Promise((resolve, reject) => {
           paymentCollection.create(req.payload,
           Joi.validate(data, schema, (err,docs)=> {
               if (err) reject(err);
               else resolve(docs);
           }));
       });
}

        
// payment table List Page

const paymentDataList = (request,h) => {
        return new Promise((resolve,reject) => 
            paymentCollection.paginate({},{offset:0, limit:10},(err,docs) => {
                if (err) {
               reject(err)
               //console.log(err)
                 }else{
                   resolve(docs)
                 }
            }))
    }

    //payment list based on ID and PIN

    const paymentRecord = (req,h) => {
        const query = req.query;
        const params = {_id: mongoose.Types.ObjectId(req.params.id),pin:query.pin};  
            return new Promise((resolve,reject) => {
                paymentCollection.findById(
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

    //     //update property details

    const paymentRecordUpdate = (req,h) => {
        
        const query = req.query;
        console.log(req.query)
        const params = {_id: mongoose.Types.ObjectId(req.params.id),pin:query.pin};
        const update_data={payment:query.payment}
        return new Promise((resolve,reject) => {
            paymentCollection.updateOne(
                params,
                { $set: update_data },((err,docs) => {
                    if(!err){
                        //if(docs.count>0){
                            resolve({status:true,message:"update success"})
                        }else{
                            resolve({status:false,message:"invalid pin or id"})
                        }
                     //}
                })); 

        })
     }
    // // delete property details

  
    const paymentRecordDelete = (req,h) => {
        const query = req.query;
        console.log(query)
        const params = {_id: mongoose.Types.ObjectId(req.params.id),pin:query.pin};
         return new Promise((resolve) => {
             paymentCollection.deleteOne(
                 params,((err,docs) => {
                     if(!err){
                        //if(docs.count>0){
                           resolve({status:true,message:"delete success"})
                        }else{
                            resolve({status:false,message:"invalid pin or id"})
                        }
                     //}
                    })); 
         })
        }
        

        module.exports = {
            paymentDetail,
            paymentDataList,
            paymentRecordUpdate,
            paymentRecordDelete,
            paymentRecord

        }