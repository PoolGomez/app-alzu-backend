const express = require("express");
const router = express.Router();
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { addCompany, getCompaniesByUserId, updateCompany, getCompany, deleteCompany } = require("../controllers/companyController");
 
router.route("/").post(
    // isVerifiedUser , 
    addCompany);
router.route("/get/:id").get(
    getCompany
)
router.route("/:id").get(
    // isVerifiedUser , 
    getCompaniesByUserId);
router.route("/:id").put(
    isVerifiedUser , 
    updateCompany);

router.route("/:id").delete(deleteCompany);

module.exports = router;