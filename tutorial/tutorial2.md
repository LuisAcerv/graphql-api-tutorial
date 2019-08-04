# How to create a simple bitcoin API with NodeJS & GraphQL — Part II.

## Introduction.

The last post we talk about GraphQL, but we haven't said anything about bitcoin, so...

## What is bitcoin?

Bitcoin is a decentralized digital currency which uses peer to peer technology to allow it's users to perform instant payments to anywhere in the world and operates with no central authority, created by the mythical [Satoshi Nakamoto](https://en.wikipedia.org/wiki/Satoshi_Nakamoto).

Many people may think that bitcoin is hype, the market is speculative and adoption is in progress, as a developer I see in bitcoin a market niche, and I think that is a good idea to learn at least the basics.

**Why?**

Well, bitcoin has a market capitalization of \$193,013,341,127 USD, and there are a lot of people trying to get into the business, learning the technology and knowing how to use it may lead you to put some money in your pockets, also, bitcoin and blockchain technology is interesting and funny to learn, you can experiment and create awesome things, and, who knows, you could become the next great crypto-entrepreneur.

In this part, we are going to talk about addresses. If you want to know more about bitcoin and it's the system you can read more [here](https://en.bitcoin.it/wiki/Main_Page).

### What is a bitcoin address?

A bitcoin address is an identifier that represents a destination to send a bitcoin payment.

Bitcoin addresses are for one time use, you must use a new bitcoin address for each transaction. Addresses are not wallets nor accounts and do not carry balances. They only receive funds, and you do not send "from" an address at any time.

Most Bitcoin addresses are 34 characters. They consist of random digits and uppercase and lowercase letters, with the exception that the uppercase letter "O", uppercase letter "I", lowercase letter "l", and the number "0" are never used to prevent visual ambiguity. There are three formats in use:

- P2PKH which begin with the number 1, eg: 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2.
- P2SH type starting with the number 3, eg: 3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy.
- Bech32 type starting with bc1, eg: bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq.

### Private keys

Let's get started with private keys. A private key in the context of Bitcoin is a secret number that allows bitcoins to be spent. Every Bitcoin wallet contains one or more private keys, which are saved in the wallet file. The private keys are mathematically related to all Bitcoin addresses generated for the wallet. It is important that these are kept secret and safe. Private keys can be kept on computer files, but are also often written on paper.

So, the only way to say you own some bitcoins is owning the private keys if you don't own your private keys then the bitcoins are not truly yours.

In the following tutorials, we are going deepen on how to use private keys to push transactions to the network (testnet).

_Before we start with the fun part, if you haven't read the first part of the tutorial you can read it [here](https://levelup.gitconnected.com/how-to-create-a-simple-bitcoin-api-with-nodejs-graphql-part-i-a8cd8832fed5?source=friends_link&sk=63e5bb0439b0e19a1132891d1e4ba588), and you can get the whole code [here](https://github.com/LuisAcerv/graphql-api-tutorial/tree/part-ii)._

## Generating a bitcoin key pairs.

For this tutorial, we are going to use the library [bitcoinjs-lib](https://github.com/bitcoinjs).

Let's start by installing the `bitcoinjs-lib`, in our working directory we run:

`npm install --save bitcoinjs-lib` or if you prefer yarn `yarn add bitcoinjs-lib`.

Now we have installed the library we need to import it into `requests.js` file as follows:

```javascript
const axios = require("axios");
const bitcoin = require("bitcoinjs-lib"); // We import the library we just have installed

...
```

Great, we can now start using the methods of the library!

Our `requests.js` file should looks like follows:

```javascript
const axios = require("axios");
const bitcoin = require("bitcoinjs-lib");

module.exports = {
  getPrices: async () => {
    const url = "https://blockchain.info/ticker?currency=MXN";
    try {
      return await axios.get(url);
    } catch (e) {
      throw new Error(e);
    }
  }
};
```

We are going to add a new method in order to generate bitcoin keypairs. So we create the method `generateKeyPairs`:

```javascript
...
  generateKeyPairs: () => {
    /*
    * It can generate a random address [and support the retrieval * of transactions for that address (via 3PBP)
    */
    const keyPair = bitcoin.ECPair.makeRandom();
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    const publicKey = keyPair.publicKey.toString("hex");
    const privateKey = keyPair.toWIF();

    return { address, privateKey, publicKey };
  }
...
```
We just have generated a random address and it's public and private keys. In further tutorials we are going to add functionality to our API to generate addresses from private keys.

Now we have our method to generate random bitcon address we need to be able to use it in our GraphQL API, so let's do it!

## Type

Currently we have only one type of our previous tutorial called `Price`, now we need to add a new type called `KeyPairs`, in our file `types.js` which currently should looks as follows:

```javascript
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
```

We are going to add the type `KeyPairs` with the properties `address`, `publicKey` and `privateKey`, something like this:

```javascript
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
}`;

module.exports = typeDefs;
```

Now that we have added our new type to our schema we need to define the method in our query type and that should looks like this:

```javascript
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
  generateNewKeyPairs: KeyPairs!

}`;

module.exports = typeDefs;
```
Once we have added our new types we need to update our resolvers.

In our `resolvers.js` file we are going to add a new one called `getNewKeyPairs`, we don't need to import anything since we already have imported our request helper in previous tutorial, so we are going to add this to our file:

```javascript
...
// Get a new bitcoin random keypairs
getNewKeyPairs() {
  const { address, publicKey, privateKey } = requests.generateKeyPairs();
  return { address, publicKey, privateKey };
}
...
```

And that's it! We can now run our API with `npm start` and go to our `localhost:4000` in our browser and test our new query like this:

```graphql
{
  getNewKeyPairs {
    address
    publicKey
    privateKey
  }
}
```

The result should looks like this:
`Insert image here`

We can check if the generated addresses are valid at https://btc.com/ searching our generated address.
`Insert image here`

Well, that's it, in this part we have learned a little about what bitcoin is, what addresses and private keys are and how to implement the `bitcoinjs-lib` and use it in the GraphQL context, in the following tutorial we are going to lear how to push transactions to the network using the testnet and how to get the balance "associated" to a given address. And in the final part of the series we are going to build a bitcoin wallet application using React and Apollo.

You can ask questions at [@luis_acervantes](https://twitter.com/luis_acervantes) or say hello.

I hope you have enjoyed the tutorial and had some fun, see you the next time!

Tutorial reposioty: https://github.com/LuisAcerv/graphql-api-tutorial
Sources:
https://github.com/bitcoinjs/bitcoinjs-lib
https://en.bitcoin.it/wiki/Main_Page


