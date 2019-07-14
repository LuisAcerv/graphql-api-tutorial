# How to create a simple bitcoin API with NodeJS y GraphQL - Part I.

## So, the first of all, what the heck is GraphQL? 
Before starting with the code I would like to say this tutorial is for a beginner level, the idea is to get started with GraphQL in a gentle and simple way, in future parts we are going to make our API bigger and more complex.

### Then, what is? 
From the official [site](https://graphql.org/): 
`GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API.`

GraphQL will help us to standardize our APIs structure and to make it more maintainable, easy to read, and easy to share across our clients.

Personally, I've been working with GraphQL the last year and a half, and I have to say that if in the beginning was some difficult to put all in order, nowadays I love GQL.

Well, as I said at the beginning we are going to build a very simple bitcoin API, the master plan is to add more functionality in future posts and create a web client which will consume our API, but by now we are just getting started to understand how GraphQL works and how we can use it for out bitcoin application.

## Getting started.
_You can get the whole repository [here](https://github.com/LuisAcerv/graphql-api-tutorial)_

First of all, we need to set up our project.
- 1 In your terminal run the following command: `mkdir btc-gql && cd btc-gql`, this command will create and access a new folder in your current directory.
- 2 In your terminal run `yarn init` and fill the fields that will be prompted.
- 3 Installing dependencies:
- 3.1 For this project we are going to need two dependencies: `axios` and `graphql-yoga`, so we run `yarn add axios graphql-yoga`
