const express = require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { addUserCompaniesConfirmed, verifyUser, getAllUserCompanyByCompanyId, updateUserCompany, deleteUserCompany } = require("../controllers/userCompanyController");
const router = express.Router();

router.route("/verify/:id").get(
    // isVerifiedUser, 
    verifyUser);
router.route("/invite").post(
    // isVerifiedUser, 
    addUserCompaniesConfirmed);

router.route("/by-company-id/:id").get( getAllUserCompanyByCompanyId);

router.route("/:id").put(updateUserCompany);

router.route("/:id").delete(deleteUserCompany);

module.exports = router;