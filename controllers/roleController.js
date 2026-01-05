const Role = require("../models/roleModel");
const createHttpError = require("http-errors");
const mongoose = require("mongoose")

const addRole = async (req, res, next) => {
  try {
    const { name, companyId , permissions, active } = req.body;
    if (!name) {
      const error = createHttpError(400, "Please provide name!");
      return next(error);
    }
    if (!permissions) {
      const error = createHttpError(400, "Please provide permissions!");
      return next(error);
    }
    
    if(!mongoose.Types.ObjectId.isValid(companyId)){
            const error = createHttpError(404, "companyId invalido!");
            return next(error);
    }


    const isRolPresent = await Role.findOne({ name, companyId });

    if (isRolPresent) {
      const error = createHttpError(400, "Role already exist!");
      return next(error);
    }

    const newRole = new Role({ name, companyId, permissions, active });
    await newRole.save();
    res
      .status(201)
      .json({ success: true, message: "Role added!", data: newRole });
  } catch (error) {
    next(error);
  }
};

const getAllRolesByCompanyId = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
        }

        const roles = await Role.find({
            companyId: id
        })
        // .populate({
        //     path:"owner",
        //     // select:""
        // })

        res.status(200).json({success: true, data: roles})
    } catch (error) {
        next(error);
    }
}

const updateRole = async (req, res, next) => {
    try {
        const { name, permissions, active } = req.body;

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
        }

        // await delay(5000);
        const role = await Role.findByIdAndUpdate(
            id,
            { name , permissions, active },
            // {new: true}
        )
        
        if(!role){
            const error = createHttpError(404, "Role not found!");
            return error;
        }

        res.status(200).json({success: true, message: "Role updated!", data: role});

    } catch (error) {
        next(error);
    }
}

const deleteRole = async (req, res, next) => {
  try {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = createHttpError(404, "Id invalido!");
        return next(error);
    }
    const roleDelete = await Role.findByIdAndDelete(id)
    res.status(200).json({success: true, data: roleDelete})
  } catch (error) {
    next(error)
  }
}

module.exports = { addRole, getAllRolesByCompanyId, updateRole, deleteRole};