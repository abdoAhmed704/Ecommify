const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("./validationMiddleware");
const Category = require("../../models/categoryModel");

// check if id of product
exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product Id"),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product Id"),
  validatorMiddleware,
];

// checks the id and slugify the title
exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product Id"),
  check("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];


// checks the title length and slugify it with some checks for the creation of product
exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3")
    .notEmpty()
    .withMessage("Product is required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description, please minmize it"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity has to a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity has to a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price has to be a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount has to be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),
  check("coverImage").notEmpty().withMessage("Product coverImage is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),

  check("brand").optional().isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];
