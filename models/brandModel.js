const mongoose = require("mongoose");

//1-Create schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand is required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [32, "Too long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);


//@desc		to anable the clint side to aceess the url image
const getURL = (doc) => {
  if (doc.image) {
    const imgeURL = `${process.env.BASE_URL}/brand/${doc.image}`;
    doc.image = imgeURL;
  }
};

//@decs		to save it in the database
brandSchema.post("save", (doc) => {
  getURL(doc);
});

//desc		to give to to the clint side
brandSchema.post("init", (doc) => {
  getURL(doc);
});

//2-Create model
const BrandModel = new mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
