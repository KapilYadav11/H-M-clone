import express from 'express';
export const connectDB = async()=>{
    try {
        let res = await mongoose.connect("mongodb://0.0.0.0/h&m")
        if(res){
            console.log("Mongodb is connected")
        }
    } catch (error) {
        console.log("Error in connecting the mongodb!")
    }
}

