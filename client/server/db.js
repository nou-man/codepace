const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "8090",
    host: "localhost",
    port: "5432",
    database: "codepace"

});

module.exports = pool;