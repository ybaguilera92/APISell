import mongoose from "mongoose";


const sellSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    unique:false
  },
  products: [{
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    //_id:{type: String},
    count: {
      type: Number,
      default: 0
    }
  }],
  gain: {
    type: Number,
    default: 0
  },
  deletedAt: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});



export default mongoose.model("Sell", sellSchema);