import jwt from "jsonwebtoken";
export const isLoggedIn = (req,res,next)=>{
    const {token} = req.cookies;
    if(!token) return res.status(403).json({message: 'Invalid credentials'});
    const verification = jwt.verify(token,process.env.JWT_Secret);
    if(!verification) return res.status(403).json({message: 'Invalid credentials'});
    req.user = verification;
    next();
}