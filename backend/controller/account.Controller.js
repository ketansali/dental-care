const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
  successResponse,
  badRequestResponse,
  notFoundResponse,
} = require("../middleware/response");
const errorResponse = require("../middleware/error-response");
const USERMASTER = mongoose.model("userMaster");
const path = require("path");
exports.account = {
    login: async function (req, res) {
        try {
          let userInfo = await USERMASTER.findOne({
            email: req.body.email,
          });
          if (userInfo) {
              if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
                  return badRequestResponse(res, {
                      message: "Authentication failed. Wrong password.",
                    });
                }
                if (!userInfo.isActive) {
                    return badRequestResponse(res, {
                        message:
                        "Your account is deactivated, please activate your account from here",
                        accountDeactive: true,
                    });
                }
                let userData = userInfo.toObject()
               delete  userData['password']
            // create a token
            var token = jwt.sign({userData}, process.env.secret, {
              expiresIn: "24h", // expires in 24 hours
            });
            return successResponse(res, {
              message: "You are logged in successfully!",
              token,
              data:userData,
            });
          }
          return notFoundResponse(res, {
            message: "Email not found!",
          });
        } catch (error) {
          return errorResponse(error, req, res);
        }
      },
  ragister: async (req, res) => {
    const userInfo = await USERMASTER.findOne({
      email: req.body.email,
    });
    if (userInfo) {
      return badRequestResponse(res, {
        message: "Email already exist!",
      });
    }
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      jobtitle: req.body.jobtitle,
      isActive: true,
    };
 
    

    var isCreated = await USERMASTER.create(user);
    if (isCreated)
      return successResponse(res, {
        message: "User created!",
      });
    else
      return badRequestResponse(res, {
        message: "Failed to create user",
      });
  },
};
