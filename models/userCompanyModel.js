const mongoose = require("mongoose");

const userCompanySchema = new mongoose.Schema({

    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
    roleId:{type: mongoose.Schema.Types.ObjectId, ref: "Role"},
    // permissions: {type: Number, require: true}

},{
    timestamps : true
});

// 👇 Clave única compuesta
userCompanySchema.index(
  { userId: 1, companyId: 1 },
  { unique: true }
);

module.exports = mongoose.model("UserCompany", userCompanySchema);