const mongoose = require("mongoose");
const errorResponse = require("../middleware/error-response");
const PATIENT_MASTER = mongoose.model("patientMaster");
const {
  successResponse,
  badRequestResponse,
} = require("../middleware/response");
const fs = require("fs");
const path = require("path");
const {
  getSingleImageOptions,
  removeImage,
  getMultipleImageOptions,
} = require("../middleware/image-response");
exports.patient = {
  addPatient: async (req, res) => {
    try {
      const patient = {
        patientType: req.body.patientType,
        orthodontist: req.body.orthodontist,
        invisalingType: req.body.invisalingType,
        intraoral: req.body.intraoral,
        treatment: req.body.treatment,
        name: req.body.name,
        isActive: true,
        reference: req.body.reference,
        createdBy: req.user.userData._id,
      };
      console.log(req)
      const imageFile = req.files ? req.files.images : [];
      const imgs = await getMultipleImageOptions(imageFile);
      if (imgs) patient.images = imgs;
      const isCreated = await PATIENT_MASTER.create(patient);
      if (isCreated) {
        return successResponse(res, {
          message: "Patient created successfully",
        });
      } else {
        return badRequestResponse(res, {
          message: "Failed to create Patient",
        });
      }
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  updatePatient: async (req, res) => {
    try {
      const patientInfo = await PATIENT_MASTER.findById(req.body.id);
      if (!patientInfo) {
        return badRequestResponse(res, {
          message: "Patient not found",
        });
      }
      const patient = {
        patientType: req.body.patientType,
        orthodontist: req.body.orthodontist,
        invisalingType: req.body.invisalingType,
        intraoral: req.body.intraoral,
        treatment: req.body.treatment,
        name: req.body.name,
        isActive: req.body.isActive,
        reference: req.body.reference,
        updatedBy: req.user.userData._id,
      };
      const imageFile = req.body.images ? req.body.images : [];
      req.body.images.map(e=>console.log("dataghghbjhbjhnjnk",e))
      if (imageFile) {
        const imgs = await getMultipleImageOptions(imageFile);
        patientInfo.images.map((imgName) => {
          removeImage(`Patients/${imgName}`);
        });
        patient.images = imgs;
      }

      await PATIENT_MASTER.findOneAndUpdate(
        { _id: patientInfo._id },
        {
          $set: patient,
        },
        { new: true }
      );
      return successResponse(res, {
        message: "Patient updated successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  deletePatient: async (req, res) => {
    try {
      const patientInfo = await PATIENT_MASTER.findById(req.query.id);
      if (!patientInfo) {
        return badRequestResponse(res, {
          message: "Patient not found",
        });
      }
      patientInfo.images.map((imgName) => {
        removeImage(`Patients/${imgName}`);
      });

      await PATIENT_MASTER.findByIdAndRemove({
        _id: patientInfo._id,
      });
      return successResponse(res, {
        message: "Patient deleted successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getPatient: async (req, res) => {
    try {
      const patient = await PATIENT_MASTER.find();
      return successResponse(res, {
        data: patient,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getPatientById: async (req, res) => {
    try {
      const patientInfo = await PATIENT_MASTER.findById(req.query.id);
      if (!patientInfo) {
        return badRequestResponse(res, {
          message: "Patient not found",
        });
      }
      return successResponse(res, {
        data: patientInfo,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
};
