// we will handle connectivity between express and mongodb
//const mongoose =require('mongoose')......for commonjs
import mongoose from 'mongoose'

import dotenv from "dotenv";
dotenv.config();


const connectDb=()=>{
try{
    mongoose.connect(process.env.MONGODB_URL);
    console.log("db has been connected");
}catch(err){
    console.error(err)
}
}
export default connectDb