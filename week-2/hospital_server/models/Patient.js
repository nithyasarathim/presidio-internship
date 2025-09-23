const mongoose= require('mongoose');

const patientSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    disease:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    }
});

const Patient= mongoose.model('Patient', patientSchema);
module.exports= Patient;