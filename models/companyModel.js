const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        require: false
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },


});

module.exports = mongoose.model("Company", CompanySchema);