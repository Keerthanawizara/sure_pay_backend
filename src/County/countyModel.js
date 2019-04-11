const mongoose = require('mongoose');

var mongoosePaginate = require('mongoose-paginate');
//get the Schema class
const Schema = mongoose.Schema;

const CountySchema = new Schema({
    county : String,
    city : String,
    state : String,
    zip : Number
});

CountySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('countycollections', CountySchema);