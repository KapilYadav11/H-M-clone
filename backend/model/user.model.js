import mongoose from "mongoose";

const userSchema =  new mongoose.Schema(
    {
      username:{
        type:String,
        required:true,
        unique:true
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      mobile:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
      },
      password:{
        type:String,
        required:true,
        minlength:6
      },
      product:[
        {
          type: mongoose.Schema.Types.ObjectId,
           ref: "product"
        },
      ],
    },
    {
        timestamps:true
    }

);
export const UserModel = mongoose.model("user", userSchema);