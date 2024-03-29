import { Router } from "express";
const router = Router();
import {createRoom,deleteRoom,getRoom,updateRoom} from "../controllers/room.controller.js";

//Create-Room
router.post('/:hotelId',createRoom)

//Update-Room
router.put('/:hotelId/:roomId',updateRoom);

//Delete-Room
router.delete('/:hotelId/:roomId',deleteRoom);

//get-Room
router.get('/:hotelId/:roomId',getRoom);
export default router;