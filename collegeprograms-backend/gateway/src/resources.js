const express = require('express');
const proxy = require('express-http-proxy');
const controllers = require('./controllers');
const middleware = require('./middleware');
const config = require('./config/config');


const app = express();

// app.use(middleware.corsMiddleware)
app.use(middleware.authMiddleware);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/programs', proxy(config.routing.programs));
app.use('/users', proxy(config.routing.users));

app.get('/', (req, res) => {
  res.send('Hello from cp agateway');
});

app.use(middleware.resourceNotFoundHandler);
module.exports = app;