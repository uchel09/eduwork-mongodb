import mongoose, { Collection } from "mongoose";

const productv2Schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "field can't be empty"],
    minLength: 3,
    maxLength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 1000,
    max: 10000000000,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    max: 9999,
  },
  status: {
    type: Boolean,
    default: true,
  },
  image_url: {
    type: String,
    default: "no_photo",
  },
});

const productV2Model = mongoose.model("Productsv2", productv2Schema);
export default productV2Model;
