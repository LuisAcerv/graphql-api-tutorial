# How to create a simple bitcoin API with NodeJS & GraphQL — Part II.

## Introduction.

We have talk about GraphQL the last post, but we haven't said anything about bitcoin, in this part we are going to talk about addresses. If you want to know more about bitcoin in general you can read more [here](https://en.bitcoin.it/wiki/Main_Page).

## What is a bitcoin address?

A bitcoin address is an identifier that represents a destination to send a bitcoin payment.

Bitcoin addresses are for one time use, you must use a new bitcoin address for each transaction. Addresses are not wallets nor accounts, and do not carry balances. They only receive funds, and you do not send "from" an address at any time.

Most Bitcoin addresses are 34 characters. They consist of random digits and uppercase and lowercase letters, with the exception that the uppercase letter "O", uppercase letter "I", lowercase letter "l", and the number "0" are never used to prevent visual ambiguity. There are three formats in use:

- P2PKH which begin with the number 1, eg: 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2.
- P2SH type starting with the number 3, eg: 3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy.
- Bech32 type starting with bc1, eg: bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq.

## 1. Generating bitcoin address.
