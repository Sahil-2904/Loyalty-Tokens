import mongoose from 'mongoose';
// import autoIncrement from 'mongoose-auto-increment';

const { Schema } = mongoose;

const ProductSchema = new Schema({
  id:{
    type:Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  desc: {
    type: String,
  },
  category: String,

  // hasWarranty: {
  //   type: Boolean,
  //   default: false,
  // },
  // vendor: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  rating: Number,
  discount: Number,
  link: String,
  tags: String
  // orderPlaced: {
  //   type: Number,
  //   default: 0,
  // },
  // totalSales: {
  //   type: Number,
  //   default: 0,
  // },
});

// ?? Numbers of Loyalty Tokens to be granted


// autoIncrement.initialize(mongoose.connection);
// ProductSchema.plugin(autoIncrement.plugin, 'Product');

const Product = mongoose.model("Product", ProductSchema);

export default Product;




