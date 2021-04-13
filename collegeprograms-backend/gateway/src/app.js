const app = require('./resources.js');
const config = require('./config/config.js')


PORT = process.env.PORT || config.node_port
app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}...`);
});