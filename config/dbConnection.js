import mongoose from "mongoose"

const connectionDB = ()=>{
    mongoose
        .connect(process.env.MongoURI)
        .then(()=>console.log("Connected to MongoDB"))
        .catch((e)=>console.log("Failed to connect to MongoDB"+e.message))
}

export default connectionDB;