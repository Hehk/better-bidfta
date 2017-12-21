module.exports = `
  type Product {
    name: String!
    id: String!
  }

  type Query {
    getProduct(id: String!): Product
    allProducts: [Product]
  }
`;
