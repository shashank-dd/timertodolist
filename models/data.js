const mongoose = require('mongoose');
const dataschema = new mongoose.Schema({
    name:{type:String,required:true},
   activity:{type:String,required:true},
   time:{type:Number,required:true}
        
})
const data = mongoose.model('activity', dataschema);
module.exports = data;



