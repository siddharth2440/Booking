import { Router } from "express";
const router = Router();
import {isLoggedIn,authorizedRoles} from "../middlewares/auth.middleware.js"
import {createRoom,deleteRoom,getRoom,updateRoom} from "../controllers/room.controller.js";

//Create-Room
router.post('/:hotelId',isLoggedIn,authorizedRoles("ADMIN"),createRoom)

//Update-Room
router.put('/:hotelId/:roomId',isLoggedIn,authorizedRoles("ADMIN"),updateRoom);

//Delete-Room
router.delete('/:hotelId/:roomId',isLoggedIn,authorizedRoles("ADMIN"),deleteRoom);

//get-Room
router.get('/:hotelId/:roomId',getRoom);
export default router;