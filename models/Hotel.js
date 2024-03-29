import { Schema, model } from "mongoose";

const hotelSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:[10,"Name atleast of 10 characters"],
        maxLength:[30,"Hotel-Name be smaller than 30 characters"]
    },
    type:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        uppercase:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    distance:{
        type:String,
        required:true
    },
    photos:{
        type:[String]
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    },
    rooms:{
        type:[String]
    },
    cheapestPrice:{
        type:Number,
        min:0,
        required:true
    },
    featured:{
        type:Boolean,
        required:true
    }
});

const hotelModel  = new model("Hotel",hotelSchema);

export default hotelModel;