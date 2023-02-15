const Product = require("../schemas/productSchema"); 

const getAllProductsModel = async () => {
    try {
        const data = Product.find();
        return data;
    } catch (err) {
        console.log(err);
    }
}


const findProducts= async (params) => {
  const search = {};
  try {
    if (params.gender) {
      search['gender'] = { $regex: `${params.gender}`, $options: 'i' }
    }
    if (params.item) {
      search['item'] = params.item
    } if (params.color) {
      search['color'] = params.color
    }
    if (params.sizes) {
        search['sizes'] = params.sizes
      }
    if (params.price) {
      search['price'] = { $lte: `${params.price}` }
    }
    const results = await Product.find(search)
    return results;
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "Error finding products by search bar",
      err,
    });
  }
}

module.exports = {getAllProductsModel, findProducts};
