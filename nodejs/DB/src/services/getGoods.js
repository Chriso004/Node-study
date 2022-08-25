const sql = require("mysql2");
const dbConfig = require("../config/dbConfig");

const getGoods = async () => {
    const pool = sql.createPool(dbConfig);
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if(error) throw error;
            connection.query("SELECT * FROM goods", (error, rows) => {
                if(error) reject(error);
                resolve(rows);
                connection.release();
            });
        })
    });
};

module.exports = getGoods;