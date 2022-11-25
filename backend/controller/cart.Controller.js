const mongoose = require("mongoose");
const errorResponse = require("../middleware/error-response");
const { successResponse, notFoundResponse } = require("../middleware/response");
const CART_MASTER = mongoose.model("cartMaster");
const PRODUCT_MASTER = mongoose.model("productMaster");
exports.Cart = {
  addItemToCart: async (req, res) => {
    const { productId, quantity } = req.body;
    try {
      CART_MASTER.findOne({ userId: req.user.userData._id }).exec(
        async (error, cart) => {
          if (error) return errorResponse(error, req, res);
          const productDetails = await PRODUCT_MASTER.findById(productId);
          if (cart) {
            let itemIndex = cart?.cartItems?.findIndex(
              (e) => e.productId == productId
            );
            if (itemIndex > -1) {
              //product exists in the cart, update the quantity
              let productItem = cart.cartItems[itemIndex];
              productItem.quantity =  parseInt(quantity);
              productItem.total = productDetails.price * quantity;
              cart.cartItems[itemIndex] = productItem;
            } else {
              //product does not exists in cart, add new item
              cart.cartItems.push({
                productId,
                quantity,
                total: productDetails.price * quantity,
              });
            }
            cart.save((error, cart) => {
              if (error) return errorResponse(error, req, res);
              if (cart) {
                return successResponse(res, {
                  message: "Item is added",
                });
              }
            });
          } else {
            //if cart not exist then create a new cart
            const cart = new CART_MASTER({
              userId: req.user.userData._id,
              cartItems: {
                productId,
                total: quantity * productDetails.price,
              },
            });
            cart.save((error, cart) => {
              if (error) return errorResponse(error, req, res);
              if (cart) {
                return successResponse(res, {
                  message: "Item is added",
                });
              }
            });
          }
        }
      );
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getCartItem: (req, res) => {
    try {
      CART_MASTER.findOne({ userId: req.user.userData._id })
        .populate("cartItems.productId")
        .exec((error, cart) => {
          if (error) return errorResponse(error, req, res);
          cart = JSON.parse(JSON.stringify(cart));
          const grandTotal = cart?.cartItems?.reduce(
            (e, tot) => e + tot.total,
            0
          );
          grandTotal? cart.grandTotal = grandTotal:null
          if (cart) {
            return successResponse(res, {
              data: cart,
            });
          } else {
            return notFoundResponse(res,{
              message: "Cart not found",
            });
          }
        });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  removeCartItem: async (req, res) => {
    try {
      const itemRemoved = await CART_MASTER.updateOne(
        { userId: req.user.userData._id },
        {
          $pull: {
            cartItems: {
              productId: req.params.productId,
            },
          },
        }
      );
      if (itemRemoved) {
        return successResponse(res, {
          message: "Item removed",
        });
      }
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
};
