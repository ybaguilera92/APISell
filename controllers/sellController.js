import sellSchema from "../models/sellModel.js";
import productSchema from "../models/productModel.js";
import {
  addLog
} from "./logController.js";
import {
  getAll,
} from "./handlerFactory.js";

const getGainTotal = async (req, res) => {
  try {
    const query = await sellSchema.find();
    let total = 0;
    query.map(x => total = total + x.gain)
    res.status(200).json({
      res: total
    });
  } catch (e) {
    return res.status(404).json({
      msg: "Fatal error with that ID!"
    });
  }
};
const addSell = async (req, res) => {
  const {
    product,
    count
  } = req.body;

  const issetProduct = await productSchema.findOne({
    _id: product
  });
  if (count > 1) {
    return res.status(400).json({
      msg: `You cannot buy more than one product!`
    });
  }
  if (!issetProduct) {
    return res.status(400).json({
      msg: `This product is not registered!`
    });
  }
  if (issetProduct.stock == 0) {
    return res.status(400).json({
      msg: `This product not have stock!`
    });
  }
  issetProduct.stock = issetProduct.stock - 1;
  await issetProduct.save();


  try {
    const issetSell = await sellSchema.findOne({
      product
    });
    if (issetSell) {
      issetSell.gain = issetSell.gain + issetProduct.price;
      issetSell.count = issetSell.count + 1;
      await issetSell.save();
      addLog(req, "Sell", "Create", "Sell is register!");
      return res.status(200).json({
        res: issetSell,
        msg: `This sell is already registered1!`
      });
    }
    const sell = await sellSchema.create({
      product: product,
      count: count,
      gain: issetProduct.price
    });
    if (sell) {
      addLog(req, "Sell", "Create", "Sell is register!");
      return res.status(200).json({
        res: sell,
        msg: `This sell is already registered2!`
      });
    }
  } catch (err) {
    addLog(req, "Sell", "Create", "Invalid token!");
    console.log(err);
  }
};

const getSells =  async (req, res) => {
  try {
    const query = await sellSchema.find().populate({
      path: 'product',
      select: '-createdAt -updatedAt -__v'
    }).select('-createdAt -updatedAt -__v');
    res.status(200).json({
      res: query
    });
  } catch (e) {
    console.log(e.message);
    return res.status(404).json({
      msg: "Fatal error!"
    });
  }
};



export {
  getGainTotal,
  getSells,
  addSell
};