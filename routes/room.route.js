import { Router } from "express";
const router = Router();

router.get('/',(req,res)=>{
    res.send("room")
})

export default router;