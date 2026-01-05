
const express = require("express");
const router = express.Router();
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { addRole, getAllRolesByCompanyId, deleteRole, updateRole } = require("../controllers/roleController");
 
router.route("/").post(
    // isVerifiedUser , 
    addRole);

router.route("/all-by-company-id/:id").get(
    // isVerifiedUser , 
    getAllRolesByCompanyId);

// router.route("/visibles/:id").get(
//     // isVerifiedUser,
//     getVisiblesRoomsByCompanyId
// )

// router.route("/:id").get(
//     getRoomById
// );
    
router.route("/:id").put(
    // isVerifiedUser , 
    updateRole);

router.route("/:id").delete(deleteRole);

module.exports = router;