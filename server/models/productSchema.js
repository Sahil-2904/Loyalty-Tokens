import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  category: String,

  hasWarranty: {
    type: Boolean,
    default: false,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderPlaced: {
    type: Number,
    default: 0,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
});

// ?? Numbers of Loyalty Tokens to be granted


autoIncrement.initialize(mongoose.connection);
ProductSchema.plugin(autoIncrement.plugin, 'Product');

const Product = mongoose.model("Product", ProductSchema);

export default Product;




