const mysql = require('mysql');
const Settings = require('../src/config/Settings');

class Connection {
  constructor() {
    this.poll = null;
    this.env = (process.env.NODE_ENV !== 'production') ? Settings.DEV : Settings.PROD;
  }

  connect() {
    this.pool = mysql.createPool({
      host: this.env.HOST,
      user: this.env.USER,
      password: this.env.PASS,
      database: this.env.DATABASE,
      connectionLimit: 10,
      multipleStatements: true
    });
  }

  acquire(callback) {
    this.pool.getConnection((error, connection) => {
      if (!error) {
        callback(connection);
      } else {
        console.log(error)
      }
    });
  }
}

module.exports = new Connection();