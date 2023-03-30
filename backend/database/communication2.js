const dbConfig = require("../config/db_config");

class MySQLdb {
 
  constructor() {
    this.mysql = require("mysql2");
    this.db = this.mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERA,
      password: dbConfig.PASA,
      database: dbConfig.DBA,
    });
  }

  async getNewData(){
    this.deleteOldData()
    var sql = "SELECT * FROM table WHERE done = 0"
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get new table! ")});
    return await lists;
  }

  async deleteOldData(){
    //deletes data that is older than 7 days
    var sql = "Delete FROM table WHERE time < now() - interval 7 DAY"
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not delete old Data! ")});
  }

  async updateData(sample){
    //sample should look like LHIX12345678
    var sql = "UPDATE table SET done = 1 WHERE sample = " + this.mysql.escape(sample)
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not update table! ")});
  }

  async getOldData(){
    this.deleteOldData()
    var sql = "SELECT * FROM table WHERE done = 1"
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get old table! ")});
    return await lists;
  }

}

module.exports.MySQLdb = MySQLdb;