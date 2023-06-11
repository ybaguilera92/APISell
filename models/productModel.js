import mongoose from "mongoose";

const producSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    require: true,
    trim: true,
  },
  stock: {
    type: Number,
    require: true,
    trim: true,
  },
  category: {
    type: String,
    require: true,
    trim: true,
  },
  tags: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  info: {
    type: String,
    require: true,
    trim: true,
  },
  val: {
    type: String,
    require: true,
    trim: true,
  },
  sku: {
    type: String,
    unique:true,
    require: true,
    trim: true,
  },
  img: {
    type: String,
    require: true,
    trim: true,
  },
  deletedAt: {
    type: Boolean,
    default: false
  }
  
}, {
  timestamps: true
});

export default mongoose.model("Product", producSchema);