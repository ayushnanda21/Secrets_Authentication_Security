# Authentication System

Backend system having 6 different levels of authentication

## Prerequisites

- Download Node LTS version here: <https://nodejs.org/en/download/>
- Download VSCode from here: <https://code.visualstudio.com/>
- Install both before continuing
- Download MongoDB from here <https://www.mongodb.com/download-center/community> don’t do anything with it just yet.

If you want to use a cloud based solution such as [mLabs](https://mlab.com) that is fine, you just need to replace the `connection string` with the one provided.

## Installation

Clone the repo:

```bash
git clone https://github.com/ayushnanda21/Secrets_Authentication_Security <YOUR_PROJECT_NAME> && cd <YOUR_PROJECT_NAME>
```

To start your own repository,

> **important:** make sure you are in the cloned directory.

```bash
rm -rf .git
git init
```

This will remove the existing git history, and allow you to link it to a new repository.

## .env

Lets create a `.env` file in the root of the project:

```bash
touch .env
```

Then put the following code in that `.env` except you should add your details.

```bash
MONGODB_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
```

## Scripts

```json
"scripts": {
    "dev": "nodemon src/index.js"
  },
```
## Mongodb
- Open the zip file mongodb came in, for mac users, go to the bin folder and double click mongod to start mongoDB. Windows users look for a similar file and run it.
- Start the web page and server by typing `npm run dev` into terminal.
- The site is now available at <http://0.0.0.0:8080/>


## Running the tests

No test scripts available

## Deployment

Deployment information coming soon :)

## Built With

- [node](https://nodejs.org/en/about/) - As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.
- [express](https://expressjs.com) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [mongoDB](https://www.mongodb.com) - MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.
- [mongoose](https://mongoosejs.com) - Mongoose provides a straight-forward, schema-based solution to model your application data.
- [dotenv](https://github.com/motdotla/dotenv#readme) - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env.`
- [cryptojs](https://www.npmjs.com/package/crypto-js)- CryptoJS is a growing collection of standard and secure cryptographic algorithms implemented in JavaScript using best practices and patterns. They are fast, and they have a consistent and simple interface.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) - JsonWebToken implementation for node.js.
- [cookie-parser](https://github.com/expressjs/cookie-parser#readme) - Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - bcrypt is a password hashing function.
- [passport](http://www.passportjs.org) - Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application.
- [passport-local](http://www.passportjs.org/packages/passport-local/) - This module lets you authenticate using a username and password in your Node.js applications.
- [passport-jwt](http://www.passportjs.org/packages/passport-jwt/) - This module lets you authenticate endpoints using a JSON web token.


## Contributing

[CONTRIBUTING.md](/CONTRIBUTING.md)

## Author(s)

- **Ayush Nanda**  [Ayush Nanda](https://github.com/ayushnanda21)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/ayushnanda21/Secrets_Authentication_Security/blob/main/LICENSE) file for details
