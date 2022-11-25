const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userMaster",
      required: true,
    },
    clinicName: {
        type: String,
        trim: true,
      },
    type: {
      type: String,
      trim: true,
      required: true,
    },
    address1: {
      type: String,
      trim: true,
    },
    address2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    contact: {
      type: Number,
      trim: true,
    },
    zipcode: {
      type: Number,
      required: true,
      trim: true,
    },
    GSTNumber: {
      type: Number,
      trim: true,
    },
    instraction: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("adressMaster", addressSchema);
