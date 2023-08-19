import mongoose from 'mongoose';

const { Schema } = mongoose;

// const shippingInfo = new Schema({
//   address: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   country: {
//     type: String,
//     required: true,
//   },
//   pincode: {
//     type: String,
//     required: true,
//   },
// });
// const paymentInfo = new Schema({
//   id: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     required: true,
//   },
// });

const OrderSchema = new Schema(
  {
    // shippingInfo: {
    //   type: shippingInfo,
    // },
    // paymentInfo: {
    //   type: paymentInfo,
    // },
    orderItems: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
    // orderStatus: {
    //   type: String,
    //   default: "Processing",
    //   enum: ["Processing", "Delivered", "Shipped"],
    //   required: true,
    // },
    totalPrice: {
      type: String,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // vendor: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;