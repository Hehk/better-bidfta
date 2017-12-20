const products = [{
  name: 'grill',
  id: 'hello-world',
}, {
  name: 'trebuchet',
  id: 'osha-certified',
}, {
  name: 'knife',
  id: 'child-friendly',
}];

const getProduct = (_, { id }) => {
  return products.find(elem => elem.id === id);
}

const allProducts = _ => products;

module.exports = {
  Query: {
    getProduct,
    allProducts,
  },
};

