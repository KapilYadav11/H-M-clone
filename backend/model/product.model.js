import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        productName:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        price:{
            currency:{
                type:String,
                enum: ["INR","USD"],
                default:"INR",
            },
            amount:{
                type:Number,
                required:true,
            }
        },
        category:{
            type:String,
            enum:["MENS","WOMENS","KIDS"],
            default:"KIDS",
        },
        sizes:[
            {
                type:String,
                enum:["S","XS","M","XL","XXL","L"],
                default:"L"
            }
        ],
        colors:[
            {
                type:String,
                required:true,
            }
        ],
        images:[
            {
                type:String,
                required:true,
            }
        ],
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        }
    },
    {
        timestamps:true,
    }
);

export const productModel = mongoose.model("product", productSchema);