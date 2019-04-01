const paymentCollection = require('./paymentModel');
const mongoose = require('mongoose');

//create payment detail API

const paymentDetail = (req,h) => {
 return new Promise((resolve,reject) => {
                paymentCollection.create({
                    pin   : req.payload.pin,
                    payment : req.payload.payment,        
                },  
                ((err,docs) => {
                    if (err) {
                console.log(err)  
              // return reject(err)
                     }else resolve(docs)
                }))
            })
        }
// payment table List Page

const paymentDataList = (request,h) => {
        return new Promise((resolve,reject) => 
            paymentCollection.paginate({}, { page: 1, limit: 3 },(err,docs) => {
                if (err) {
                reject(err)
               // console.log(err)
                 }else{
                   resolve(docs)
                 }
            }))
    }

    //payment list based on ID and PIN

    const paymentRecord = (req,h) => {
        const query = req.query;
        console.log(req.query)
        const params = {_id: mongoose.Types.ObjectId(req.params.id),pin:query.pin};  
            console.log(req.params.id)
            console.log(query.pin)
            return new Promise((resolve,reject) => {
                paymentCollection.findOne(
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
        const params = {_id: mongoose.Types.ObjectId(req.params.id),pin:query.pin};
        // console.log(params)

     const update_data={payment:query.payment}
        return new Promise((resolve,reject) => {
            paymentCollection.updateOne(
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

  
    const paymentRecordDelete = (req,h) => {
        const query = req.query;
        console.log(req.query)
      const params = {_id: mongoose.Types.ObjectId(req.params.id),pin:query.pin};
      console.log(params)
         return new Promise((resolve) => {
             paymentCollection.deleteOne(
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
            paymentDetail,
            paymentDataList,
            paymentRecordUpdate,
            paymentRecordDelete,
            paymentRecord

        }