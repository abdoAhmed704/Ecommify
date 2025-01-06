const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("./validationMiddleware");

// check id of the brand
exports.getBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id format"),
  validatorMiddleware,
];

// check of the request to create a brand
exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 32 })
    .withMessage("Too long Brand name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];


// check of the request to update a brand
exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  check("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

// check the id of the brand required to delete
exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  validatorMiddleware,
];
