const Room = require("../models/roomModel");
const createHttpError = require("http-errors");
const mongoose = require("mongoose")

const addRoom = async (req, res, next) => {
  try {
    const { title, visible, companyId } = req.body;
    if (!title) {
      const error = createHttpError(400, "Please provide title!");
      return next(error);
    }
    const isTablePresent = await Room.findOne({ title, visible });

    if (isTablePresent) {
      const error = createHttpError(400, "Room already exist!");
      return next(error);
    }

    const newRoom = new Room({ title, visible, companyId });
    await newRoom.save();
    res
      .status(201)
      .json({ success: true, message: "Room added!", data: newRoom });
  } catch (error) {
    next(error);
  }
};

const getRoomById = async (req, res, next)=>{
  try {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
    }

    const room = await Room.findById(id);

    res.status(200).json({success: true, data: room})

  } catch (error) {
    next(error);
  }
}

const getAllRoomsByCompanyId = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
        }

        const rooms = await Room.find({
            companyId: id
        })
        // .populate({
        //     path:"owner",
        //     // select:""
        // })

        res.status(200).json({success: true, data: rooms})
    } catch (error) {
        next(error);
    }
}

const getVisiblesRoomsByCompanyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
    }
    const rooms = await Room.find({
      companyId: id,
      visible: true
    })
    res.status(200).json({success: true, data: rooms})
  } catch (error) {
    next(error);
  }
}
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const updateRoom = async (req, res, next) => {
    try {
        const { title, visible } = req.body;

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
        }

        // await delay(5000);
        const room = await Room.findByIdAndUpdate(
            id,
            { title , visible },
            // {new: true}
        )
        
        if(!room){
            const error = createHttpError(404, "Room not found!");
            return error;
        }

        res.status(200).json({success: true, message: "Room updated!", data: room});

    } catch (error) {
        next(error);
    }
}

const deleteRoom = async (req,res,next) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
        }
        const roomDelete = await Room.findByIdAndDelete(id)
        res.status(200).json({success: true, data: roomDelete})
    } catch (error) {
         next(error)
    }
}

module.exports = { addRoom, getAllRoomsByCompanyId , getRoomById, updateRoom, deleteRoom, getVisiblesRoomsByCompanyId};