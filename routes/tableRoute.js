const express = require("express");
const { addTable, getTables, updateTable, getTablesAllByCompanyId } = require("../controllers/tableController");
const router = express.Router();
const { isVerifiedUser } = require("../middlewares/tokenVerification")
 
router.route("/").post(
    // isVerifiedUser , 
    addTable);
router.route("/").get(isVerifiedUser , getTables);
router.route("/by-company-id/:id").get(isVerifiedUser , getTablesAllByCompanyId);
router.route("/:id").put(isVerifiedUser , updateTable);

module.exports = router;