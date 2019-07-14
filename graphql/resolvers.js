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
    }
  }
};

module.exports = resolvers;
