const dbConfig = require("../config/db_config");

class MySQLdb {
 
  constructor() {
    this.mysql = require("mysql2");
    this.db = this.mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USERB,
      password: dbConfig.PASB,
      database: dbConfig.DBB,
    });
  }

  async getFusers(date){
    var sql = "SELECT * FROM table WHERE start = '07:00:00' AND datum = " + this.mysql.escape(date)
    let users = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get Fusers! for " + date)});
    for(var i = 0; i < users.length; i++){
      if(users[i].bemerkung.includes("abwesend")){
        users[i].bemerkung = users[i].bemerkung.concat(" Krank")
      }
    }
    return await users;
  }

  async getSusers(date){
    var sql = "SELECT * FROM table WHERE (start = '11:30:00' OR start = '10:00:00' OR start = '07:00:00') AND datum = " + this.mysql.escape(date) + " ORDER BY start"
    let users = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get Susers! for " + date)});
    for(var i = 0; i < users.length; i++){
      if(users[i].bemerkung.includes("abwesend")){
        users[i].bemerkung = users[i].bemerkung.concat(" Krank")
      }
      if(users[i].start == '07:00:00'){
        users[i].bemerkung = users[i].bemerkung.concat(" früh")
      }
      if(users[i].start == '10:00:00'){
        users[i].bemerkung = users[i].bemerkung.concat(" pav16")
      }
      if(users[i].start == '11:30:00'){
        users[i].bemerkung = users[i].bemerkung.concat(" spät")
      }
    }
    return await users;
  }

  async getNusers(date){
    var sql = "SELECT * FROM table WHERE start = '21:15:00' AND datum = " + this.mysql.escape(date)
    let users = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get Nusers! for " + date)});
    for(var i = 0; i < users.length; i++){
      if(users[i].bemerkung.includes("abwesend")){
        users[i].bemerkung = users[i].bemerkung.concat(" Krank")
      }
    }
    return await users;
  }

}

module.exports.MySQLdb = MySQLdb;