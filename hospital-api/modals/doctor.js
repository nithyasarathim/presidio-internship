import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name:{ 
        type: String,
        required: true
    },
    email:{ 
        type: String, 
        required: true, 
        unique: true
    },
    password:{
        type: String, 
        required: true 
    },
    role:{ 
        type: String, 
        enum:["doctor","admin"],
        default: "doctor" 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
