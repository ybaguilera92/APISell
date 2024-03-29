import productSchema from "../models/productModel.js";

import {
  getAll,
  getOne,
  deleteOne,
  countAll
} from "./handlerFactory.js";

const getSku = async (req, res) => {
  try {
    
    const { sku } = req.body;

    const query = await productSchema.findOne({ sku });

    if (!query) return res.status(404).json({ msg: "There is not product with this sku!" });

    res.status(200).json({ res: query });

  } catch (e) {
    return res.status(500).json({ msg: "Fatal error with that SKU!" });
  }
};

const getStock = async (req, res) => {
  try {

    const query = await productSchema.find({  stock: 0 });
    res.status(200).json({ res: query });

  } catch (e) {
    return res.status(500).json({ msg: "Fatal error!" });
  }
};

const addProduct = async (req, res) => {
 
  try {
    const { sku } = req.body;

    const issetSku = await productSchema.findOne({ sku }); 

    if (issetSku) return res.status(400).json({ msg: `This sku is already registered!` });

    const product = new productSchema(req.body);
    await product.save();

    res.status(201).json({
      res: product,
      msg: "A new product create!"
    });
    
  } catch (err) {
    return res.status(500).json({ msg: "Fatal Error!"});
  }
};
const updateProduct = async (req, res) => {  

  try {

    const { _id  } = req.params;
    const { sku  } = req.body;

    const issetId = await productSchema.findById(_id);
    if (!issetId) return res.status(404).json({ msg: "No product found with that ID!" }); 

    const issetSku = await productSchema.findOne({ sku });
    if (issetSku && issetSku.id != _id) return res.status(400).json({  msg: "This sku is associated with another product!" });
    
    issetId.name = req.body.name || issetId.name;
    issetId.price = req.body.price || issetId.price;
    issetId.stock = req.body.stock || issetId.stock;
    issetId.category = req.body.category || issetId.category;
    issetId.tags = req.body.tags || issetId.tags;
    issetId.description = req.body.description;
    issetId.info = req.body.info || issetId.info;
    issetId.val = req.body.val || issetId.val;
    issetId.sku = sku || issetId.sku;
    issetId.img = req.body.img || issetId.img;

    const userStored = await issetId.save();
    res.status(201).json({
      res: userStored,
      msg: "Updated product!!"
    });

  } catch (err) {
    return res.status(500).json({ msg: "Fatal error!" });
  }
}

const getProducts = getAll(productSchema);
const countProducts = countAll(productSchema);
const getProduct = getOne(productSchema);
const deleteProduct = deleteOne(productSchema);


export {
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getSku,
  countProducts,
  getStock
};