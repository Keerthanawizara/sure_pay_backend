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
    //const propertyData = () => {
        return new Promise((resolve,reject) => 
            paymentCollection.find((err,docs) => {
                if (err) 
                //reject(err)
                console.log(err)
                resolve(docs)
            }))
    }

    //payment list based on ID and PIN

    const paymentRecord = (req,h) => {
        const query = req.query;
        console.log(query)
        const params = {_id: mongoose.Types.ObjectId(req.params.id),
            pin:JSON.parse(query.pin)};
            console.log(params)
            return new Promise((resolve,reject) => {
                paymentCollection.findByIdAndUpdate(
                    params,
                    {$set: query},((err,docs) => {
                        if(err){
                           console.log(err)
                            //reject(err)
                        }else{
                          resolve(docs)
                           //({status:true,message:"update success"})
                        }
                    })); 
    
            })
                
        }

    //     //update property details

    const paymentRecordUpdate = (req,h) => {
       const query = req.query;
        console.log(query)
     const params = {_id: mongoose.Types.ObjectId(req.params.id),
                  pin:JSON.parse(query.pin)};
                  console.log(params) 
        return new Promise((resolve,reject) => {
            paymentCollection.update(
                params,
                { $set: query },((err,docs) => {
                    if(err){
                       console.log(err)
                        //reject(err)
                    }else{
                      resolve(docs)
                       //({status:true,message:"update success"})
                    }
                })); 

        })
     }
    // // delete property details

  
    const paymentRecordDelete = (req,h) => {
        const query = req.query;
         console.log(query)
      const params = {_id: mongoose.Types.ObjectId(req.params.id),
                   pin:JSON.parse(query.pin)};
                   console.log(params) 
         return new Promise((resolve,reject) => {
             paymentCollection.Remove(
                 params,
                 { $set: query },((err,docs) => {
                     if(err){
                    console.log(err)
                        // reject(err)
                     }else{
                       resolve(docs)
                       // ({status:true,message:"Deleted success"})
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