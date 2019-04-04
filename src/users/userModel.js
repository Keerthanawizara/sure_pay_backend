
const mongoose = require('mongoose');

//get the Schema class
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
     required : true,
     type : String
    },
      password: {
          required : true,
          type : String
      }
});

module.exports = mongoose.model('usercollections', userSchema);
