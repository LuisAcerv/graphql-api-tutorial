const typeDefs = `
scalar JSON

type Price {
  price:JSON!
}

type KeyPairs {
  address:String!
  publicKey: String!
  privateKey: String!
}

type Query {
  getPrices: Price!
  getPrice(currency:String!): Price!
  getNewKeyPairs: KeyPairs!
}`;

module.exports = typeDefs;
