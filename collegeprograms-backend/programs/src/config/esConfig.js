const elasticsearch = require('@elastic/elasticsearch');
const config = require('./config');


const client = new elasticsearch.Client({ node: config.es_url });

async function checkConnection () {
  let isConnected = false
  while (!isConnected) {
    console.log('Connecting to ES')
    try {
      const health = await client.cluster.health({})
      isConnected = true
      console.log('ES Connected')
    } catch (err) {
      console.log('Connection Failed, Retrying...', err)
    }
  }
}

module.exports = {
  checkConnection,
  client
};
