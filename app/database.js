//using pool for multiple connections
const {Pool} = require('pg');

//import config
const { pg_url } = require(`./config`);

//using url string for connection
const config = {
    connectionString: pg_url,
};

//pool init
const pool = new Pool(config);

module.exports = pool;