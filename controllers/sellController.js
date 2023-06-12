import sellSchema from "../models/sellModel.js";
import productSchema from "../models/productModel.js";
import userSchema from "../models/userModel.js";

const getGainTotal = async (req, res) => {
  try {
    const query = await sellSchema.find();
    let total = 0;
    query.map(x => total = total + x.gain);
    res.status(200).json({ res: total });

  } catch (e) {
    return res.status(404).json({ msg: "Fatal error!" });
  }
};

const addSells = async (req, res) => { 

  try {

    const sellItems = req.body;
    let categorys = [];
    const user = await userSchema.findOne({ _id: sellItems.user });

    if (!user) return res.status(404).json({ msg: `This user is not registered!` });
    
    for (const sellItem of sellItems.products) {
      const { product, count} = sellItem;
      const productItem = await productSchema.findOne({ _id: product });

      if (!productItem) return res.status(404).json({ msg: `This product is not registered!` });

      if (count > 1)  return res.status(404).json({ msg: `You cannot buy more than one ${productItem.name}!`});

      if (productItem.stock == 0) return res.status(404).json({ msg: `This ${productItem.name} not have stock!` });

      if (categorys.includes(productItem.category)) return res.status(404).json({ msg: `This category exist in more than product!` });
      else categorys.push(productItem.category);
    }
    let gainTotal = 0;
    let products = [];
    for (const sellItem of sellItems.products) {

      const {product, count} = sellItem;

      const productItem = await productSchema.findOne({ _id: product });
      productItem.stock = productItem.stock - 1;
      await productItem.save();

      gainTotal = gainTotal + productItem.price;
      const sell = {
        product: product,
        count: count,
      };
      products.push(sell);
    }
    const sells = new sellSchema({
      products: products,
      user: user._id,
      gain: gainTotal
    });
    sells.save();
    return res.status(200).json({ msg: `Sells registered successfully!`});
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Fatal error!" });
  }
};

const getSells = async (req, res) => {
  try {

    const query = await sellSchema.find().populate({
      path: 'user',
      select: 'name lastName'
    }).populate({
      path: 'products.product',
      select: 'name price description'
    }).select('-createdAt -updatedAt -__v -deletedAt');

    res.status(200).json({ res: query });

  } catch (e) {
    return res.status(404).json({ msg: "Fatal error!"});
  }
};



export {
  getGainTotal,
  getSells,
  addSells,
};