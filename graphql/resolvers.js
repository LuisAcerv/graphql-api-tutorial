const requests = require("./requests");

const resolvers = {
  Query: {
    // Get all available prices
    async getPrices(parent, args, ctx, info) {
      const prices = await requests.getPrices();
      return { price: prices.data };
    },
    // Get the price of a given currency symbol
    async getPrice(parent, args, ctx, info) {
      const prices = await requests.getPrices();
      return { price: { [args["currency"]]: prices.data[args["currency"]] } };
    },
    // Get a new bitcoin random keypairs
    getNewKeyPairs() {
      const { address, publicKey, privateKey } = requests.generateKeyPairs();
      return { address, publicKey, privateKey };
    }
  }
};

module.exports = resolvers;
