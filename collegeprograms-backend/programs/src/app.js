const express = require('express');
const mongoose = require('mongoose');
const middleware = require('./middleware');
const config = require('./config/config');
const routes = require('./resources');
const migrationRoutes = require('./migrations/resources');
const esConnection = require('./config/esConfig');


mongoose.connect(config.databases.mongodb.url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', () => console.log("mongodb connected"));
mongoose.set('useFindAndModify', false);

esConnection.checkConnection();

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === 'localhost') {
  app.use(middleware.requestPrintMiddleware);
}
app.use(routes);
app.use('/migrations', migrationRoutes);
app.use(middleware.resourceNotFoundHandler);
app.use(middleware.defaultErrorHandlerMiddleware);

PORT = process.env.PORT || config.node_port
app.listen(PORT, () => {
  console.log(`Programs listening on port ${PORT}...`);
});