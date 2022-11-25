const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema(
  {
    patientType: {
      type: String,
      trim: true,
    },
    orthodontist: {
      type: String,
      trim: true,
    },
    invisalingType: {
      type: String,
      trim: true,
    },
    images : [{
        type : String
    }],
    intraoral: {
      type: String,
      trim: true,
    },
    treatment: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
    },
    reference: {
        type: String,
      },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userMaster",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userMaster",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("patientMaster", patientSchema);
