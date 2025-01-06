const express = require("express");

const {
  getCouponById,
  getCoupons,
  createCoupon,
  updateCouponById,
  deleteCouponById,
} = require("../controllers/couponController");

const auth = require("../controllers/authController");

const router = express.Router();


// Secure the routes with JWT authentication and only allow admin users to access them.
router.use(auth.secure, auth.allowedRoles("admin"));

// Define routes for managing coupons.
router.route("/").get(getCoupons).post(createCoupon);
router
  .route("/:id")
  .get(getCouponById)
  .put(updateCouponById)
  .delete(deleteCouponById);

module.exports = router;
