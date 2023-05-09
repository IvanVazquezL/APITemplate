const { Pool } = require('pg');

const dbConnection = new Pool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.portdb
});

module.exports = dbConnection;
