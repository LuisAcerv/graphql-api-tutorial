const axios = require("axios");

module.exports = {
  getPrices: async () => {
    const url = "https://blockchain.info/ticker?currency=MXN";
    try {
      return await axios.get(url);
    } catch (error) {
      console.error(error);
    }
  }
};
