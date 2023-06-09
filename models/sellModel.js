import mongoose from "mongoose";


const sellSchema = mongoose.Schema({
  
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  count: {
    type: Number,
    default: 0
  },
  gain: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});



export default mongoose.model("Sell", sellSchema);