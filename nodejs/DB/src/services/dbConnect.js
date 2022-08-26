const sql = require("mysql2");
const dbConfig = require("../config/dbConfig");

const connection = sql.createConnection(dbConfig);

connection.connect(error => {
    if (error) throw error;
    console.log("DB 연결 성공");
});

module.exports = connection;