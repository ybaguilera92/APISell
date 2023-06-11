import sellSchema from "../models/sellModel.js";
import productSchema from "../models/productModel.js";


const getGainTotal = async (req, res) => {
  try {

    const query = await sellSchema.find();
    let total = 0;
    query.map(x => total = total + x.gain)
    res.status(200).json({ res: total });

  } catch (e) {
    return res.status(404).json({  msg: "Fatal error!" });
  }
};

const addSells = async (req, res) => {
  const sellItems = req.body;
  let categorys = [];

  try {
    for (const sellItem of sellItems) {

      const { product,count } = sellItem;
      const productItem = await productSchema.findOne({ _id: product });

      if (!productItem) {
        return res.status(404).json({  msg: `This product is not registered!` });
      }
      if (count > 1) {
        return res.status(404).json({  msg: `You cannot buy more than one ${productItem.name}!` });
      }      
      if (productItem.stock == 0) {
        return res.status(404).json({  msg: `This ${productItem.name} not have stock!` });
      }
      if (categorys.includes(productItem.category)) {
        return res.status(404).json({ msg: `This category exist in more than product!` });
      } else { 
        categorys.push(productItem.category);
      }
    }
    for (const sellItem of sellItems) {

      const { product } = sellItem;

      const productItem = await productSchema.findOne({ _id: product });   
      productItem.stock = productItem.stock - 1;
      await productItem.save();

      const sellOne = await sellSchema.findOne({ product });

      if (sellOne) {
        sellOne.gain = sellOne.gain + productItem.price;
        sellOne.count = sellOne.count + 1;
        await sellOne.save();
      } else {
        const sell = await sellSchema.create({
          product: product,
          count: 1,
          gain: productItem.price
        });
      }
    }
    return res.status(200).json({
      msg: `Sells registered successfully!`
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({  msg: "Fatal error!" });
  }
};

const getSells =  async (req, res) => {
  try {

    const query = await sellSchema.find().populate({
      path: 'product',
      select: '-createdAt -updatedAt -__v -deletedAt'
    }).select('-createdAt -updatedAt -__v -deletedAt');
    res.status(200).json({ res: query });
    
  } catch (e) {
    return res.status(404).json({  msg: "Fatal error!" });
  }
};


const addSell = async (req, res) => {
  
  const { product, count } = req.body;

  const issetProduct = await productSchema.findOne({ _id: product });

  if (count > 1) {
    return res.status(404).json({  msg: `You cannot buy more than one product!` });
  }
  if (!issetProduct) {
    return res.status(404).json({  msg: `This product is not registered!` });
  }
  if (issetProduct.stock == 0) {
    return res.status(404).json({  msg: `This product not have stock!` });
  }

  issetProduct.stock = issetProduct.stock - 1;
  await issetProduct.save();

  try {

    const issetSell = await sellSchema.findOne({ product });
    
    if (issetSell) {
      issetSell.gain = issetSell.gain + issetProduct.price;
      issetSell.count = issetSell.count + 1;
      await issetSell.save();
      return res.status(200).json({
        res: issetSell,
        msg: `This sell is already registered!`
      });
    }

    const sell = await sellSchema.create({
      product: product,
      count: count,
      gain: issetProduct.price
    });

    if (sell) {
      return res.status(200).json({
        res: sell,
        msg: `This sell is already registered!`
      });
    }
  } catch (err) {
    return res.status(404).json({  msg: "Fatal error!" });
  }
};


export {
  getGainTotal,
  getSells,
  addSell,
  addSells
};