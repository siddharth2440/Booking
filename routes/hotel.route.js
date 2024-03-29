import { Router } from "express";
import {createHotel,deleteHotel,getHotel,getHotels,updateHotel} from "../controllers/hotel.controller.js"
import {isLoggedIn} from "../middlewares/auth.middleware.js"
const router = Router();

//create Hotel
router.post('/',isLoggedIn,createHotel);

//update Hotel
router.put('/:id',isLoggedIn,updateHotel)

//delete Hotel
router.delete('/:hotelId',isLoggedIn,deleteHotel);

//get Hotel
router.get('/:id',getHotel);

//get Hotels  (only Access By the Admin)
router.get('/',isLoggedIn,getHotels);

export default router;