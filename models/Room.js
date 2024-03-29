import { Schema, model } from "mongoose";

const roomSchema = new Schema({
    title:{
        type:String,
        required:true,
        minLength:[5,"title must be atleast of 5 characters"],
        maxLength:[50,"title must be smaller than 50 characters"]
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    maxPeople:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
        minLength:[5,"description must be atleast of 5 characters"],
        maxLength:[500,"description must be smaller than 500 characters"]
    },
    roomNumbers:[
        {
            number:Number,
            unavailableDates:{
                type:[Date]
            }
        }
    ]
})

const roomModel = new model("room",roomSchema);
export default roomModel;