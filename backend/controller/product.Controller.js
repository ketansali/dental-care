const mongoose = require("mongoose");
const errorResponse = require("../middleware/error-response");
const PRODUCT_MASTER = mongoose.model("productMaster");
const {
  successResponse,
  badRequestResponse,
} = require("../middleware/response");
const fs = require("fs");
const path = require("path");
const { getSingleImageOptions, removeImage } = require("../middleware/image-response");
exports.product = {
  
  addProduct: async (req, res) => {
    try {
      const product = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        createdBy: req.user.userData._id,
      };

      
      if (req.files && Object.keys(req.files).length > 0) {
        const storePath = "Products";
        const fileInfo = getSingleImageOptions(req, storePath);
        const extensionName = path.extname(fileInfo.fileName); // fetch the file extension
        const allowedExtension = [".png", ".jpg", ".jpeg"];
        if (!allowedExtension.includes(extensionName)) {
          return badRequestResponse(res, {
            message: "!Invalid image",
          });
        }

        product.image = fileInfo.fileName;
        fileInfo.uploadedFile.mv(fileInfo.uploadFilePath, async (err) => {
          if (err)
            return badRequestResponse(res, {
              message: "Failed to save file",
            });
        });
      }
      const isCreated = await PRODUCT_MASTER.create(product);
      if (isCreated) {
        return successResponse(res, {
          message: "Product created successfully",
        });
      } else {
        return badRequestResponse(res, {
          message: "Failed to create Product",
        });
      }
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const productInfo = await PRODUCT_MASTER.findById(req.body.id);
      if (!productInfo) {
        return badRequestResponse(res, {
          message: "Product not found",
        });
      }
      const product = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        updatedBy: req.user.userData._id,
      };
      if (req.files && Object.keys(req.files).length > 0) {
        const storePath = "Products";
        removeImage(`Products/${productInfo.image}`)
        const fileInfo = getSingleImageOptions(req,storePath);
        const extensionName = path.extname(fileInfo.fileName);
        const allowedExtension = [".png", ".jpg", ".jpeg"];
        if (!allowedExtension.includes(extensionName)) {
          return badRequestResponse(res, {
            message: "!Invalid image",
          });
        }
        product.image = fileInfo.fileName;
        fileInfo.uploadedFile.mv(fileInfo.uploadFilePath, async (err) => {
          if (err)
            return badRequestResponse(res, {
              message: "Failed to save file",
            });
        });
      }

      await PRODUCT_MASTER.findOneAndUpdate(
        { _id: productInfo._id },
        {
          $set: product,
        },
        { new: true }
      );
      return successResponse(res, {
        message: "Product updated successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const productInfo = await PRODUCT_MASTER.findById(req.query.id);
      if (!productInfo) {
        return badRequestResponse(res, {
          message: "Product not found",
        });
      }
      removeImage(`Products/${productInfo.image}`)
      await PRODUCT_MASTER.findByIdAndRemove({
        _id: productInfo._id,
      });
      return successResponse(res, {
        message: "Product deleted successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await PRODUCT_MASTER.find();
      return successResponse(res, {
        data: product,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getProductById: async (req, res) => {
    try {
      const productInfo = await PRODUCT_MASTER.findById(req.query.id);
      if (!productInfo) {
        return badRequestResponse(res, {
          message: "Product not found",
        });
      }
      return successResponse(res, {
        data: productInfo,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
};
