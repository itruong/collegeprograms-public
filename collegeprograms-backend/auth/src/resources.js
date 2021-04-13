const firebaseAuth = require('firebase-admin');
const express = require('express');
const config = require('./config/config');
const controllers = require('./controllers');
const middleware = require('./middleware');
//export to GOOGLE_APPLICATION_CREDENTIALS
const firebaseAuthServiceAccount = require('./config/devServiceAccountKey.json');


const app = express();

firebaseAuth.initializeApp({
  credential: firebaseAuth.credential.cert(firebaseAuthServiceAccount),
  databaseURL: config.databases.url,
});

app.get('/', (req, res) => {
  controllers.getUserId(req, res, firebaseAuth);
});

app.use(middleware.resourceNotFoundHandler);

module.exports = app;
