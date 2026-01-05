const createHttpError = require("http-errors");
const Company = require("../models/companyModel");
const mongoose = require("mongoose");

const addCompany = async (req, res, next) => {
    try {
        const { owner, name , description } = req.body;

        if (!owner || !name) {
            const error = createHttpError(400, "Please provide data!");
            return next(error);
        }

        const isCompanyPresent = await Company.findOne({name, description , owner});
        if(isCompanyPresent){
            const error = createHttpError(400, "El nombre de la empresa ya existe");
            return next(error);
        }

        const newCompany = new Company({
            name,
            description,
            owner
        });
        await newCompany.save();

        res
            .status(201)
            .json({success: true, message: "Company added!", data: newCompany});
        


    } catch (error) {
        next(error)
    }
};

const getCompany = async ( req, res, next)=>{
    try {
        const {id} = req.params;
        console.log("company_id:", id)
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
        }

        const company = await Company.findById(id)

        console.log("company:", company)

        res.status(200).json({success: true, data: company})

    } catch (error) {
        next(error)
    }
}

const getCompaniesByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
        }

        const companies = await Company.find({
            owner: id
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

const updateCompany = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
        }

        const company = await Company.findByIdAndUpdate(
            id,
            { name , description },
            {new: true}
        )
        
        if(!company){
            const error = createHttpError(404, "Company not found!");
            return error;
        }

        res.status(200).json({success: true, message: "Company updated!", data: company});

    } catch (error) {
        next(error);
    }
}
const deleteCompany = async (req,res,next) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Id invalido!");
            return next(error);
        }
        const companyDelete = await Company.findOneAndDelete({_id: id})
        console.log("empresa eliminada: ", companyDelete)

        res.status(200).json({success: true, data: companyDelete})

    } catch (error) {
         next(error)
    }
}

module.exports = { addCompany, getCompany, getCompaniesByUserId, updateCompany, deleteCompany}