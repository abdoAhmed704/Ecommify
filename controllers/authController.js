const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const SendError = require("../utils/sendError");
const User = require("../models/userModel");

const generateToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

// @desc    signUp controller
// @route   POST  /api/v1/users
// @access  public
exports.signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const token = generateToken(user._id);
  res.status(201).json({ data: user, token });
});

// @desc    login controller
// @route   POST  /api/v1/users
// @access  public
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new SendError("invalid email or password", 401));
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return next(new SendError("invalid email or password", 401));
  }
  const token = generateToken(user._id);
  res.status(200).json({ data: user, token });
});


// @desc    see if the user have permitions to enter
exports.secure = asyncHandler(async (req, res, next) => {
  // get the token from the header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new SendError("You should login first", 401));
  }

  // verfy the token
  const verfiedToken = jwt.verify(token, process.env.JWT_SECRET_KET);

  // check if the user is exists
  const user = await User.findById(verfiedToken.userId);
  if (!user) {
    return next(new SendError("User is not exists", 401));
  }
  // check if the password changed after create the token
  if (user.passwordChangedAt) {
    const passwordChangedtimestamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    // token must be not valid anyMore....
    if (passwordChangedtimestamp > verfiedToken.iat) {
      return next(
        new SendError("password has changed, please login again!!!", 401)
      );
    }
  }
  req.user = user;
  next();
});

// @desc    indicate the allowed roles to access the routes
exports.allowedRoles = (...allowedRoles) =>
  asyncHandler(async (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new SendError("You are Not allowed to access this route.", 403)
      );
    }
    next();
  });
