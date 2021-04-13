const config = require('./config/config');
const app = require('./resources');


const PORT = process.env.PORT || config.nodePort;
app.listen(PORT, () => {
  console.log(`Auth listening on port ${PORT}...`);
});
