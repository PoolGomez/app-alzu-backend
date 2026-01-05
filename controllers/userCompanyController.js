const createHttpError = require("http-errors");
const UserCompany = require("../models/userCompanyModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const getUserCompaniesByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
        }

        const companies = await UserCompany.find({
            userId: id
        })
        // .populate({
        //     path:"owner",
        //     // select:""
        // })

        res.status(200).json({success: true, data: companies})
    } catch (error) {
        next(error);
    }
}

// confirma la invitacion 
const addUserCompaniesConfirmed = async (req, res, next) => {
  try {
    const { userId, companyId, roleId } = req.body;

    if (!userId) {
      const error = createHttpError(400, "Please provide userId!");
      return next(error);
    }
    
    if (!companyId) {
      const error = createHttpError(400, "Please provide companyId!");
      return next(error);
    }
    if (!roleId) {
      const error = createHttpError(400, "Please provide roleId!");
      return next(error);
    }

        const existe = await UserCompany.exists({userId, companyId});
        if(existe){
            throw new Error("El usuario ya pertenece a esta empresa")
        }

    const newUserInvited =  new UserCompany({
        userId,
        companyId,
        roleId
    })

    await newUserInvited.save();

    res
      .status(201)
      .json({ success: true, message: "User Company added!", data: newUserInvited });
  } catch (error) {
    next(error);
  }
};

//funcion para verificar el usuario antes de enviar la invitacion
const verifyUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const isUserPresent = await User.findOne({ publicId: id });

        if(isUserPresent) {
            res.status(200).json({success: true, data: {
                _id: isUserPresent._id,
                name: isUserPresent.name,
                email: isUserPresent.email
            }})
        }else{
            const error = createHttpError(400, "Usuario no encontrado");
            return next(error);
        }

    } catch (error) {
        next(error);
    }
}

const getAllUserCompanyByCompanyId = async (req, res, next)=>{
    try {
        const {id} = req.params;
        // const usersCompany = await UserCompany.find({companyId: id})
        //     .populate("userId", "name email")
        //     .populate("roleId","name")
        //     // .populate({
        //     //     path:"userId",
        //     //     select: "name email"
        //     // })
        //     // .populate({
        //     //     path: "roleId",
        //     //     select:"name"
        //     // })
        //     .lean();

        const usersCompany = await UserCompany.aggregate([
            {
                $match: {
                    companyId: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "_id",
                    as: "role"
                }
            },
            { $unwind: "$role" },
            {
                $project: {
                    _id: "$_id",
                    userId: "$user._id",
                    userName: "$user.name",
                    userEmail: "$user.email",
                    roleId: "$role._id",
                    roleName: "$role.name",
                    companyId: "$companyId",
                    createdAt: 1
                }
            }
        ]);

        
        res.status(200).json({success: true, data: usersCompany})
        
    } catch (error) {
        next(error)
    }
}

const updateUserCompany = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const {roleId} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
        }
        
        // await delay(5000);
        const userCompanyUpdated = await UserCompany.findByIdAndUpdate(
            id,
            { roleId },
            // {new: true}
        )
        
        if(!userCompanyUpdated){
            const error = createHttpError(404, "UserCompany not found!");
            return error;
        }

        res.status(200).json({success: true, message: "UserCompany updated!", data: userCompanyUpdated});


    } catch (error) {
        
    }
}

const deleteUserCompany = async (req,res,next) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
        }
        const userCompanyDeleted = await UserCompany.findByIdAndDelete(id)
        res.status(200).json({success: true, data: userCompanyDeleted})
        
    } catch (error) {
         next(error)
    }
}

module.exports = { getUserCompaniesByUserId, addUserCompaniesConfirmed, verifyUser, getAllUserCompanyByCompanyId, updateUserCompany, deleteUserCompany}