const mongoose = require("mongoose");
const errorResponse = require("../middleware/error-response");
const ORDER_MASTER = mongoose.model("orderMaster");
const CART_MASTER = mongoose.model("cartMaster");
const {
  successResponse,
  badRequestResponse,
} = require("../middleware/response");

exports.order = {
  addOrder: async (req, res) => {
    try {
      const { totalAmount, paymentStatus, items, cartId } = req.body;
      let orderData = {
        userId: req.user.userData._id,
        items: JSON.parse(items),
        totalAmount,
        paymentStatus,
      };

      const isCreated = await ORDER_MASTER.create(orderData);
      if (isCreated) {
        await CART_MASTER.findByIdAndDelete(cartId);
        return successResponse(res, {
          message: "Order created successfully",
        });
      } else {
        return badRequestResponse(res, {
          message: "Failed to create Order",
        });
      }
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
    updatePaymentStatus: async (req, res) => {
      try {
        const orderInfo = await ORDER_MASTER.findOne({userId : req.user.userData._id});
        if (!orderInfo) {
          return badRequestResponse(res, {
            message: "Order not found",
          });
        }

        await ORDER_MASTER.findOneAndUpdate(
          { _id: orderInfo._id },
          {
            $set: {
              paymentStatus: "completed",
            },
          },
          { new: true }
        );
        return successResponse(res, {
          message: "Order updated successfully",
        });
      } catch (error) {
        return errorResponse(error, req, res);
      }
    },
    // deleteOrder: async (req, res) => {
    //   try {
    //     const orderInfo = await ORDER_MASTER.findById(req.query.id);
    //     if (!orderInfo) {
    //       return badRequestResponse(res, {
    //         message: "Order not found",
    //       });
    //     }
    //     await ORDER_MASTER.findByIdAndRemove({
    //       _id: orderInfo._id,
    //     });
    //     return successResponse(res, {
    //       message: "Order deleted successfully",
    //     });
    //   } catch (error) {
    //     return errorResponse(error, req, res);
    //   }
    // },
  getOrder: async (req, res) => {
    try {
      const order = await ORDER_MASTER.find().populate(
        "items.productId",
        "_id title price"
      );
      return successResponse(res, {
        data: order,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getOrderById: (req, res) => {
    try {
      ORDER_MASTER.findOne({ userId: req.user.userData._id })
        .populate("items.productId", "_id title price image")
        .exec((error, order) => {
          if (error) return errorResponse(error, req, res);
          order = JSON.parse(JSON.stringify(order));
          const grandTotal = order?.items?.reduce((e, tot) => e + tot.total, 0);
          grandTotal ? (order.grandTotal = grandTotal) : null;
          if (!order) {
            return badRequestResponse(res, {
              message: "Order not found",
            });
          }
          return successResponse(res, {
            data: order,
          });
        });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
};
