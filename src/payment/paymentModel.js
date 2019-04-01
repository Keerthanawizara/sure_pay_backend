const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
//get the Schema class
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    pin: {
     required : true,
     type : String
    },
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
      payment: {
          required : true,
          type : String
      }
});
PaymentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('paymentcollections', PaymentSchema);
