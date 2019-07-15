# How to create a simple bitcoin API with NodeJS and GraphQL - Part I.

## So, the first of all, what the heck is GraphQL? 
Before starting with the code I would like to say this tutorial is for a beginner level, the idea is to get started with GraphQL in a gentle and simple way, in future parts we are going to make our API bigger and more complex.

### Then, what is? 
From the official [site](https://graphql.org/): 
`GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API.`

GraphQL will help us to standardize our APIs structure and to make it more maintainable, easy to read, and easy to share across our clients and much more.

Personally, I've been working with GraphQL the last year and a half, and I have to say that if in the beginning was some difficult to put all in order, nowadays I love GQL.

Well, we are going to build a very simple bitcoin API to get bitcoin prices in different currencies, the master plan is to add more functionality in future posts and create a web client which will consume our API, but by now we are just getting started to understand how GraphQL works and how we can use it for our bitcoin application.

## Getting started.
_I will go through the whole process, but you can get the whole repository [here](https://github.com/LuisAcerv/graphql-api-tutorial)_

## Project set up
First of all, we need to set up our project.
### 1 Create your woking directory
- In your terminal run the following command: `mkdir btc-gql-api && cd btc-gql-api`, this command will create and access a new folder in your current directory.
### 2 Init your project
- In your terminal run `yarn init` or `npm install` and fill the fields that will be prompted.
This will create the following file in your directory:
```
package.json
```
The package will look something like this:
```json
{
  "name": "my-new-project",
  "version": "1.0.0",
  "description": "My New Project description.",
  "main": "index.js",
  "repository": {
    "url": "https://example.com/your-username/my-new-project",
    "type": "git"
  },
  "author": "Your Name <you@example.com>",
  "license": "MIT"
}
```
- Run `touch index.js` in order to create your entry file in your working directory. (If you are in windows create the file manually in your code editor).
- Add a start command, in your `package.json` add a new section:
```json
...
"scripts": {
  "start": "node index.js"
},
...
```
Your package should look like this:
```json
{
  "name": "my-new-project",
  "version": "1.0.0",
  "description": "My New Project description.",
  "main": "index.js","scripts": {
    "start": "node index.js"
  },
  "repository": {
    "url": "https://example.com/your-username/my-new-project",
    "type": "git"
  },
  "author": "Your Name <you@example.com>",
  "license": "MIT"
}
```
- Create a new folder called `graphql` in your working directory, so your stucture should look like this:
```
+ btc-gql-api
|__ graphql
|__ package.json
|__ index.json
```
- Create three new files called `types.js`, `resolvers.js`, `request.js` inside of `graphql` directory, your project should look like this:
```json
+ btc-gql-api
|__+graphql
|____request.js
|____resolvers.js
|____types.js
|__ package.json
|__ index.json
```
### 3 Installing dependencies
- For this project we are going to need two dependencies: `axios` and `graphql-yoga`, so we run `yarn add axios graphql-yoga`.

That's it, we have set up our project and we can start writing some code!
## 4 Types
The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:
```graphql
type User {
  name: String!
  email: String!
}
```
GraphQL comes with a set of default scalar types out of the box:
* Int: A signed 32‐bit integer.
* Float: A signed double-precision floating-point value.
* String: A UTF‐8 character sequence.
* Boolean: true or false.
* ID: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.

There is also a way to specify custom scalar types. For example, we could define a Date type:
```graphql
scalar Date
```
If you want to learn more about types in GraphQL I encourage you to check out the GraphQL [documentation](https://graphql.org/learn/schema/)

Let's create our types!

Open the file `./graphql/types.js` in your code editor and add the following:
```javascript

const typeDefs = `
scalar JSON

type Price {
  price:JSON!
}`;

module.exports = typeDefs;
```

What did just happened here?
Well, as we learn before GraphQL uses the type language to represent the objects in your API, for our bitcoin API we are going to need by now just one type in our schema, the type `Price`

```graphql
...
type Price {
  price:JSON!
}
...
```

As you can see the type `Price` has only one field called `price` and it's type is `JSON` and cannot be null (that's what the `!` symbol means). We have talked about the default data type which `GraphQL` includes by default, and `JSON` is not one of them, so we need to define it:
```graphql
scalar JSON

type Price {
  price:JSON!
}
...

```
## 5 Queries
GraphQL is about managing data, a `query` is basically asking for specific fields on objects:
Query:
```graphql

query{
  getPrices{
    price
  }
}
```
Result:
```json

{
  "data": {
    "getPrices": {
      "price": {
        "USD": {
          "15m": 10436.54,
          "last": 10436.54,
          "buy": 10436.54,
          "sell": 10436.54,
          "symbol": "$"
        }
        ...
      }
    }
  }
}
```
As you can see the response has the same structure of the request.
## 6 Query and Mutation types
There are other two kind of types that are special within a schema, `Query` and `Mutation`.

Every GraphQL service has at least a query type and may or may not have a mutation type. These types are the same as a regular object type, but they define the entry point of every GraphQL query. They looks like this:

```graphql
scalar JSON

type Price {
  price:JSON!
}

type Query {
  getPrices: Price!
  getPrice(currency:String!): Price!
}

```

That means that our GraphQL service have a Query type with `getPrices` and `getPrice` fields and both are equal to our `Price` type, and we can see that the field `getPrice` has an argument `(currency:String!)`. Every field on a GraphQL object type can have zero or more arguments.

Arguments can be either required or optional, in this case, we want a required argument called currency which we will use to select the currency we want to query.
That's it until now you have learned what types exist in GraphQL, and we have set up the necessary types for our application.

## 7 The request helper
Before we can continue with GraphQL we need a little helper which will be responsible for fetching the bitcoin prices, to achieve this we are going to use the [Blockchain.com](https://www.blockchain.com/es/api/exchange_rates_api) API ticker, but you could use any other service you want.

Open the file we created previously: `./graphql/request.js` and add the following:
```javascript
const axios = require("axios");

module.exports = {
  getPrices: async () => {
    const url = "https://blockchain.info/ticker";
    try {
      return await axios.get(url);
    } catch (error) {
      console.error(error);
    }
  }
};
```
We are going to use `axios` to make the `GET` request, but you easily could use any other tool to achieve this.

## 8 Resolvers
Each field on each type is backed by a function called the resolver which is provided by the GraphQL server developer. When a field is executed, the corresponding resolver is called to produce the next value.

If a field produces a scalar value like a string or number, then the execution completes. However if a field produces an object value then the query will contain another selection of fields which apply to that object. This continues until scalar values are reached. GraphQL queries always end at scalar values.

At the top level of every GraphQL server is a type that represents all of the possible entry points into the GraphQL API, it's often called the Root type or the Query type.

Open the file called `./graphql/resolvers.js` and add the following:
```javascript
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
```
