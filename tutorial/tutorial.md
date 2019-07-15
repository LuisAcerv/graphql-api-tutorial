# How to create a simple bitcoin API with NodeJS y GraphQL - Part I.

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
## Types
