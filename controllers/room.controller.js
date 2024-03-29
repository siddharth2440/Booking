import room from "../models/Room.js";
import hotel from "../models/Hotel.js"
export const createRoom =async (req,res)=>{
    const newRoom = new room(req.body);
    try {
        const {hotelId} = req.params;
        const savedRoom = await newRoom.save();
        if(!savedRoom){
            return res.status(400).json({success:false,message: "Room not created"});
        }
        await hotel.updateOne({_id:hotelId},{$push:{rooms:savedRoom._id}});
        return res.status(200).json({success:true,message: "Room created",data:savedRoom});
    } catch (error) {
        return res.status(400).json({success:false,message:"Error saving room"});
    }
}

export const updateRoom = async (req,res)=>{
    const {hotelId,roomId} = req.params;
    const updateRoom = await room.findByIdAndUpdate(roomId,{$set:req.body},{$new:true});
    if(!updateRoom){
        return res.status(400).json({success:false,message: "Hotel not found"});
    }
    return res.status(200).json({success:true,message:"Updated"});
}


export const deleteRoom = async (req,res)=>{
    const {hotelId,roomId} = req.params;
    const deleteRoom = await room.findByIdAndDelete(roomId);
    if(!deleteRoom){
        return res.status(400).json({
            success:false,
            message:"Invalid HotelId"
        })
    }
    await hotel.updateOne({_id:hotelId},{$pull:{rooms:roomId}},{$new:true});
    return res.status(200).json({
        success:true,
        message:"Room deleted"
    })
}

export const getRoom = async (req,res)=>{
    const {roomId} = req.params;
    const getRoom = await room.findById(roomId);
    if(!getRoom){
        return res.status(400).json({
            success:false,
            message:"Invalid RoomId"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Room found",
        data:getRoom
    })
}