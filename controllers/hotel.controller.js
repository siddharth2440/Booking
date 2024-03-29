import hotel from "../models/Hotel.js";
export const createHotel = async (req,res)=>{ 
    const newHotel = new hotel(req.body);
    try {
        const savedHotel = await newHotel.save()
        if(!savedHotel){
            return res.status(400).json({
                success:false,
                message: "Something went wrong"
            })
        }
        return res.status(200).json({
            success:true,
            message: "Hotel created successfully",
            data:savedHotel
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Error in creating the Hotel"
        })
    }
}

export const updateHotel =async (req,res)=>{
    const {id} = req.params;
    const findHotel = await hotel.findById(id)
    if(!findHotel){
        return res.status(400).json({
            success:false,
            message: "Hotel not found"
        })
    }

    const updatedHotel = await hotel.findByIdAndUpdate(id,req.body,{new:true})
    if(!updatedHotel){
        return res.status(400).json({
            success:false,
            message: "Something went wrong"
        })
    }
    return res.status(200).json({
        success:true,
        message: "Hotel updated successfully",
        data:updatedHotel
    })
}

export const deleteHotel = async (req,res)=>{
    const {hotelId} = req.params;
    const findHotel = await hotel.findOne({_id:hotelId});
    if(!findHotel){
        return res.status(400).json({
            success:false,
            message: "Hotel not found"
        })
    }

    const deletedHotel = await hotel.findByIdAndDelete(hotelId)
    if(!deletedHotel){
        return res.status(400).json({
            success:false,
            message: "Something went wrong"
        })
    }
    return res.status(200).json({
        success:true,
        message: "Hotel deleted successfully",
        data:deletedHotel
    })
}

export const getHotel = async (req,res)=>{
    const {id} = req.params;
    const findTheHotel = await hotel.findById(id);
    if(!findTheHotel){
        return res.status(400).json({
            success:false,
            message: "Hotel not found"
        })
    }

    return res.status(200).json({
        success:true,
        message:"hotel is there",
        findTheHotel
    })
}

export const getHotels = async (req,res)=>{
    const getAllHotels = await hotel.find({}).limit(5);
    if(!getAllHotels){
        return res.status(400).json({
            success:false,
            message: "Something went wrong"
        })
    }
    return res.status(200).json({
        success:true,
        message:"All hotels are there",
        getAllHotels
    })
}