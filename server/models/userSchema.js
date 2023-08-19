import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      // unique: true,
      index: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    name: {
      type: String,
    },
    contact: {
      type: String,
    },
    type: {
      type: String,
      default: "customer",
      enum: ["superAdmin", "admin", "seller", "customer"],
    },
    walletAddress: {
      type: String,
      unique: true,
    },
    badge:{
      type:String,
      default: 'https://i.postimg.cc/g0mqG4t3/bronze.png'
  },
    // challenges:[
    //     {
    //       challenge:{
    //           type:String,
    //         },
    //       completed: {
    //           type: Boolean
    //         },
    //         mark:{
    //           type: Number
    //         }
    //       }
    //     ],
    referalCode:{
        type:String,
        default: uuidv4().substring(0, 8)
      },
      cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      },
      order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      }
  },
  { timestamps: true },
  
);

const User = mongoose.model("User", userSchema);

export default User;

// {
// 	shippingInfo: {
// 	  address: "IIIT Pune",
// 	  city: "Pune",
// 	  state: "MH",
// 	  country: "IN",
// 	  pincode: 411041,
// 	  phoneNo: 8449129069,
// 	},
// 	paymentInfo: {
// 	  id: "20220724111212800110168631303907828",
// 	  status: "TXN_SUCCESS",
// 	},
// 	_id: "62dd5d9c23ed77d3be77e849",
// 	orderItems:
// 	  {
// 		name: "Apple iPhone 12",
// 		price: "$999",
// 		image: "",
// 		description:
// 		  "This is the new Apple iPhone 12 with extra and astonishing new feautures",
// 		_id: "62e287083a6a1f39982ed8a1",
// 		qty: 1,
// 	  },
// 	user: "62dd1695fe702a25e7766fa9",
// 	paidAt: "2022-07-24T14:56:28.297Z",
// 	totalPrice: 499,
// 	orderStatus: "Delivered",
// 	shippedAt: "2022-07-22T14:56:28.297Z",
// 	deliveredAt: "2022-07-24T14:56:28.297Z",
// 	createdAt: "2022-07-21T14:56:28.301Z",
// 	__v: 0,
//   },