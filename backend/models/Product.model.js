const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        trim: true,
      },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userMaster'
    },
    updatedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userMaster'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("productMaster", productSchema);
