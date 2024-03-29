import user from "../models/User.js";
const cookieOptions = {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
}
export const register =async (req,res) =>{
    const {username,email,image,country,password,phone} = req.body;
    const emailCheck = await user.findOne({email: email});
    if(emailCheck){
        return res.status(400).json({success:false,message: "Email already exists"});
    }
    const newUser = new user({username: username, email: email, image: image, country: country, password: password, phone: phone});
    const token =await newUser.createJWTToken();
    await newUser.save();
    res.cookie("token", token,cookieOptions);
    return res.status(200).json({
        success:true,
        message:"User created Succeddfully",
        newUser
    })
}

export const login =async (req,res) =>{
    const {email, password} = req.body;
    const isMailExists = await user.findOne({ email: email}).select("+password");
    if(!isMailExists){
        return res.status(400).json({success:false,message: "Email does not exist"});
    }
    console.log("Email exist")
    const compare = await isMailExists.comparePassword(password);
    if(!compare){
        return res.status(400).json({success:false,message: "Password does not match"});
    }
    console.log("Password is same");
    const token = await isMailExists.createJWTToken();
    res.cookie("token",token,cookieOptions);
    isMailExists.password = undefined;
    return res.status(200).json({
        success:true,
        message:"Login successfully",
        isMailExists
    })
}

export const logout = async (req, res) => {
    res.cookie("token",null,{
        httpOnly: true,
        secure: true,
        maxAge:0
    })

    return res.status(200).json({
        success:true,
        message:"User logout Succesfully"
    })
}

export const getUserprofile = async (req, res) => {
    const {id} = req.user;
    const User = await user.findById(id);
    if (!User) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }
    console.log("Hello World");

    return res.status(200).json({
        success: true,
        message: "User found",
        userInfo: User
    })   
}