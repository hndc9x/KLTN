const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type : String
    },
    email : {
      type : String
    },
    total: {
      type: Number,
      required: true,
    },
    nameUser: {
      type:String
    },
    phone : {
      type : String
    },
    Address : {
      type:String
    },
    note : {
      type : String
    },
    shipping :{
      type : String,
      default : "Free Shipping"
    },
    date:{
      type : Date
    },
    status : {
      type : String,
      default : "Packing"
    },
    delivering : {
      type : Boolean,
      default : false
    },
    isCompleted : {
      type : Boolean,
      default : false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);