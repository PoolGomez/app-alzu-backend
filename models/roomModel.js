const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    visible: {
        type: Boolean,
        default: true
    },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company"}
});

module.exports = mongoose.model("Room", tableSchema);