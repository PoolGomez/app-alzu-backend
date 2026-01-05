const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  permissions: { type: Number, required: true },
  active: {type: Boolean}
});

module.exports = mongoose.model("Role", roleSchema);
