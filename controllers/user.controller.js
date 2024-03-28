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

export const login =async () =>{
    const {email, password} = req.body;
    const isMailExists = await user.findOne({ email: email}).select("+password");
    if(!isMailExists){
        return res.status(400).json({success:false,message: "Email does not exist"});
    }

    const compare = await isMailExists.comparePassword(password);
    if(!compare){
        return res.status(400).json({success:false,message: "Password does not match"});
    }
    const token = isMailExists.createToken();
    res.cookie("token", token,cookieOptions);
    return res.status(200).json({
        success:true,
        message:"Login successfully"
    })
}

export const logout = async (req, res) => {
    return res.cookie("token",null,{
        httpOnly: true,
        secure: true,
        maxAge:0
    })
}

export const getUserprofile = async (req, res) => {
    const {id} = req.user;
    const user = await user.findById(id);
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }

    return res.status(200).json({
        success: true,
        message: "User found",
        userInfo: user
    })   
}