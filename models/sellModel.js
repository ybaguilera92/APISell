import mongoose from "mongoose";


const sellSchema = mongoose.Schema({
  
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    unique: true
  },
  count: {
    type: Number,
    default: 0
  },
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