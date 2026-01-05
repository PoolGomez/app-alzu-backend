const Table = require("../models/tableModel");
const createHttpError = require("http-errors");
const mongoose = require("mongoose")

const addTable = async (req, res, next) => {
  try {
    const { title, seats, roomId , companyId} = req.body;
    if (!title) {
      const error = createHttpError(400, "Please provide nombre!");
      return next(error);
    }
    if (!seats) {
      const error = createHttpError(400, "Please provide capacidad!");
      return next(error);
    }
    if (!roomId) {
      const error = createHttpError(400, "Please provide sala!");
      return next(error);
    }
    if (!companyId) {
      const error = createHttpError(400, "Please provide empresa!");
      return next(error);
    }
    // const isTablePresent = await Table.findOne({ title });

    // if (isTablePresent) {
    //   console.log("isTablePresenet: ", isTablePresent)
    //   const error = createHttpError(400, "Table already exist!");
    //   return next(error);
    // }
    
    const newTable = new Table({ title, seats, roomId, companyId });
    await newTable.save();
    res
      .status(201)
      .json({ success: true, message: "Table added!", data: newTable });
  } catch (error) {
    next(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().populate({
      path: "currentOrder",
      select: "customerDetails"
    });
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = createHttpError(404, "Invalid id!");
        return next(error);
    }

    const table = await Table.findByIdAndUpdate(
        id,
      { status, currentOrder: orderId },
      { new: true }
    );

    if (!table) {
      const error = createHttpError(404, "Table not found!");
      return error;
    }

    res.status(200).json({success: true, message: "Table updated!", data: table});

  } catch (error) {
    next(error);
  }
};

const getTablesAllByCompanyId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
                const error = createHttpError(404, "Id invalido!");
                return next(error);
    }

    const tables = await Table.find({companyId: id}).populate({
      path: "currentOrder",
      select: "customerDetails"
    });
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
};

module.exports = { addTable, getTables, updateTable, getTablesAllByCompanyId };