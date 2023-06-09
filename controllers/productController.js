import productSchema from "../models/productModel.js";
import {
  addLog
} from "./logController.js";
import {
  getAll,
  getOne,
  deleteOne,
  countAll
} from "./handlerFactory.js";

const getSku = async (req, res) => {
  try {
    const {
      sku
    } = req.body;

    const query = await productSchema.findOne({
      sku
    });
    res.status(200).json({
      res: query
    });
  } catch (e) {
    return res.status(404).json({
      msg: "Fatal error with that ID!"
    });
  }
};
const getStock = async (req, res) => {
  try { 
    const query = await productSchema.find({
      stock: 0
    });
    res.status(200).json({
      res: query
    });
  } catch (e) {
    return res.status(404).json({
      msg: "Fatal error with that ID!"
    });
  }
};
const addProduct = async (req, res) => {
  const {
    sku
  } = req.body;

  const issetSku = await productSchema.findOne({
    sku
  });

  if (issetSku) {
    addLog(req, "Product", "Create", "Product is register!");
    return res.status(400).json({
      msg: `This sku is already registered!`
    });
  }

  try {
    const product = new productSchema(req.body);

    await product.save();

    addLog(req, "Product", "Create", "A new product create!");
    res.json({
      res: product,
      msg: "A new product create!"
    });
  } catch (err) {
    addLog(req, "Product", "Create", "Invalid token!");
    console.log(err);
  }
};
const updateProduct = async (req, res) => {
  const {
    _id,
    sku
  } = req.params;

  try {
    const issetId = await productSchema.findById(_id);
    if (!issetId) {
      addLog(req, "Products", "Update", "In getting product!");
      return res.status(404).json({
        msg: "Error getting user!"
      });
    }
    const issetSku = await productSchema.findOne({
      sku
    });
    if (issetSku && issetSku != _id) {
      addLog(req, "Products", "Update", "In getting product!");
      return res.status(404).json({
        msg: "Error getting user!"
      });
    }

    issetId.name = req.body.name || issetId.name;
    issetId.price = req.body.price || issetId.price;
    issetId.stock = req.body.stock || issetId.stock;
    issetId.category = req.body.category || issetId.category;
    issetId.tags = req.body.tags || issetId.tags;
    issetId.description = req.body.description;
    issetId.info = req.body.info || issetId.info;
    issetId.val = req.body.val || issetId.val;
    issetId.sku = req.body.sku || issetId.sku;
    issetId.img = req.body.img || issetId.img;

    const userStored = await issetId.save();
    res.json({
      res: userStored,
      msg:"Updated product!!"
    });


  } catch (err) {
    addLog(req, "Product", "Update One", "Invalid token!");
    return res.status(404).json({
      msg: "Fatal error!"
    });
  }
}

const getProducts = getAll(productSchema);
const countProducts = countAll(productSchema);
const getProduct = getOne(productSchema);
const deleteProduct = deleteOne(productSchema, "Users");


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