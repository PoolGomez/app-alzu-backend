const express = require("express");
const router = express.Router();
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { addRoom, getAllRoomsByCompanyId, getRoomById, updateRoom, deleteRoom, getVisiblesRoomsByCompanyId } = require("../controllers/roomController");
 
router.route("/").post(
    // isVerifiedUser , 
    addRoom);
// router.route("/get/:id").get(
//     getCompany
// )
router.route("/all/:id").get(
    // isVerifiedUser , 
    getAllRoomsByCompanyId);

router.route("/visibles/:id").get(
    // isVerifiedUser,
    getVisiblesRoomsByCompanyId
)

router.route("/:id").get(
    getRoomById
);
    
router.route("/:id").put(
    isVerifiedUser , 
    updateRoom);

router.route("/:id").delete(deleteRoom);

module.exports = router;