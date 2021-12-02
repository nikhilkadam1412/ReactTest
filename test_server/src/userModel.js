const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "reactTest",
  password: "admin",
  port: 5432,
});


const getOrgMaster = () => {
    return new Promise(function (resolve, reject) {
        pool.query(
            'SELECT * FROM "public".tutorials',
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            }
        );
    });
};

module.exports = {
    getOrgMaster,
};