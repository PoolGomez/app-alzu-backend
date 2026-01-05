const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    status: {
        type: String,
        default: "Available"
    },
    seats: { 
        type: Number,
        required: true
    },
    currentOrder: {type: mongoose.Schema.Types.ObjectId, ref: "Order" ,required:false},
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company"},
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room"}

});

module.exports = mongoose.model("Table", tableSchema);