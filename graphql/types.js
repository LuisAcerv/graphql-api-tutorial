const typeDefs = `
scalar JSON

type Price {
  price:JSON!
}

type Query {
  getPrices: Price!
  getPrice(currency:String!): Price!
}`;

module.exports = typeDefs;
