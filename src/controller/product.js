const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  const { sku ,name, price, discount , offerEnd , saleCount ,category, shortDescription ,fullDescription , stock ,tag } = req.body;
  let image = [];
  if (req.files.length > 0) {
    image = req.files.map((file) => {
      return `http://localhost:2000/public/${file.filename}`;
    });
  }

  const product = new Product({
    id : `${slugify(name)}-${shortid.generate()}`,
    sku,
    name: name,
    slug: slugify(name),
    price,
    discount,
    offerEnd,
    saleCount,
    category,
    shortDescription,
    fullDescription,
    image,
    stock,
    tag,
    createdBy: req.user._id
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json( product );
    }
  });
};

exports.updateProducts = async (req, res) => {
  const {  name , stock , price , discount , tag } = req.body;
  const updateProducts = [];
  const product = {
    name: name,
    stock : stock,
    price : price,
    discount : discount,
    tag : [tag]
  };

  const updateProduct = await Product.findOneAndUpdate(
    { _id: req.body._id },
    product,
    { new: true }
  );
  updateProducts.push(updateProduct);
  return res.status(201).json({ updateProduct: updateProducts });
};


exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

// new update
exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({})
    .select("id sku name slug price discount offerEnd newProduct saleCount category shortDescription fullDescription image stock tag ")
    // .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json(products);
};