import { Router } from "express";
import {createHotel,deleteHotel,getHotel,getHotels,updateHotel} from "../controllers/hotel.controller.js"
import {isLoggedIn,authorizedRoles} from "../middlewares/auth.middleware.js"
const router = Router();

//create Hotel
router.post('/',isLoggedIn,authorizedRoles("ADMIN"),createHotel);

//update Hotel
router.put('/:id',isLoggedIn,authorizedRoles("ADMIN"),updateHotel)

//delete Hotel
router.delete('/:hotelId',isLoggedIn,authorizedRoles("ADMIN"),deleteHotel);

//get Hotel
router.get('/:id',getHotel);

//get Hotels  (only Access By the Admin)
router.get('/',isLoggedIn,authorizedRoles("ADMIN"),getHotels);

export default router;