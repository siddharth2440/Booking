import {Schema, model} from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        minLength:[3,"Username atleast of 3 characters"],
        maxLength:[50,"Usernamemust be smaller than 50 characters"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String
    },
    country:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:[5,"Password atleast of 5 characters"],
        maxLength:[15,"Password must be smaller than 15 characters"],
        select:false
    },
    phone:{
        type:Number,
        required:true,
        maxLength:9,
        minLength:9
    },
    role:{
        type:String,
        required:true,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})


userSchema.methods = {
    createJWTToken: async function(){
        return jwt.sign({id:this._id,email:this.email,role:this.role}, process.env.JWT_Secret,{
            expiresIn: process.env.JWT_ExpiresIn
        })
    },
    comparePassword:async function(password){
        return await bcrypt.compare(password,this.password);
    }
}

const userModel =new model("User",userSchema);
export default userModel;