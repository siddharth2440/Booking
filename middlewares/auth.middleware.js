import jwt from "jsonwebtoken";
export const isLoggedIn = (req,res,next)=>{
    // console.log("Token Checking");
    const {token} = req.cookies;
    // console.log("token ++ "+token)
    if(!token) return res.status(403).json({message: 'Invalid credentials'});
    const verification = jwt.verify(token,process.env.JWT_Secret);
    if(!verification) return res.status(403).json({message: 'Invalid credentials'});
    req.user = verification;
    next();
}


export const authorizedRoles = (...roles)=>(req,res,next)=>{
    const userRole = req.user.role;
    const findRole = roles.includes(userRole);
    if(!findRole) return res.status(403).json({success:false,message: 'Invalid Role'});
    next();
}