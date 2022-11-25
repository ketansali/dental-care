const mongoose = require("mongoose");
const errorResponse = require("../middleware/error-response");
const ADDRESS_MASTER = mongoose.model("adressMaster");
const {
  successResponse,
  badRequestResponse,
} = require("../middleware/response");

exports.address = {
  addAddress: async (req, res) => {
    try {
      const address = {
        userId: req.user.userData._id,
        clinicName: req.body.clinicName,
        type: req.body.type,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        contact: req.body.contact,
        zipcode: req.body.zipcode,
        GSTNumber: req.body.GSTNumber,
        instraction: req.body.instraction,
      };

      const isCreated = await ADDRESS_MASTER.create(address);
      if (isCreated) {
        return successResponse(res, {
          message: "Address created successfully",
        });
      } else {
        return badRequestResponse(res, {
          message: "Failed to create Address",
        });
      }
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  updateAddress: async (req, res) => {
    try {
      const addressInfo = await ADDRESS_MASTER.findById(req.body.id);
      if (!addressInfo) {
        return badRequestResponse(res, {
          message: "Address not found",
        });
      }

      await ADDRESS_MASTER.findOneAndUpdate(
        { _id: addressInfo._id },
        {
          $set: {
            clinicName: req.body.clinicName,
            type: req.body.type,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            contact: req.body.contact,
            zipcode: req.body.zipcode,
            GTSNumber: req.body.GTSNumber,
            instraction: req.body.instraction,
          },
        },
        { new: true }
      );
      return successResponse(res, {
        message: "Address updated successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  deleteAddress: async (req, res) => {
    try {
      const addressInfo = await ADDRESS_MASTER.findById(req.query.id);
      if (!addressInfo) {
        return badRequestResponse(res, {
          message: "Address not found",
        });
      }
      await ADDRESS_MASTER.findByIdAndRemove({
        _id: addressInfo._id,
      });
      return successResponse(res, {
        message: "Address deleted successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getAddress: async (req, res) => {
    try {
      const address = await ADDRESS_MASTER.find({userId:req.user.userData._id})
      return successResponse(res, {
        data: address,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getAddressById: async (req, res) => {
    try {
      const addressInfo = await ADDRESS_MASTER.findById(req.query.id);
      if (!addressInfo) {
        return badRequestResponse(res, {
          message: "Address not found",
        });
      }
      return successResponse(res, {
        data: addressInfo,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
};
