const dbConfig = require("../config/db_config");

class MySQLdb {
  
  constructor() {
    this.mysql = require("mysql2");
    this.db = this.mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PAS,
      database: dbConfig.DB,
    });
  }

  

  async getDayText(){
    var sql = "SELECT * FROM table"
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await lists;
  }

  async getWeekText(){
    var sql = "SELECT * FROM table"
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await lists;
  }

  async getTwoWeeksText(){
    var sql = "SELECT * FROM table"
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await lists;
  }

  async getMonthText(){
    var sql = "SELECT * FROM table"
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await lists;
  }

  async getDay(){
    /*Code for working with fiffrent Database
    var today = new Date();
    today.setDate(today.getDate() - 1)
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = String(today.getFullYear());
    var day = mm + '/' + dd + '/' + yyyy;
    console.log(day)
    var sql = `SELECT * FROM table WHERE Date LIKE '%${day}%'`;
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await lists;*/
    var sql = "SELECT * FROM table"
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await lists;
  }

  async getWeek(){
    /*Code for working with fiffrent Database
    var days = []
    for(var j = 0; j < 7; j++){
        var today = new Date();
        today.setDate(today.getDate() - j - 1)
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = String(today.getFullYear());
        var week = mm + '/' + dd + '/' + yyyy;
        days.push(week)
    }
    console.log(days)
    var sql = `SELECT * FROM table WHERE Date LIKE '%${days[0]}%'`;
    for(var k = 1; k < days.length; k++){
        sql += ` OR Date LIKE '%${days[k]}%'`
    }
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await lists;*/
    var sql = "SELECT * FROM table"
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await lists;
  }

  async getTwoWeeks(){
    /*Code for working with fiffrent Database
    var days = []
    for(var j = 0; j < 14; j++){
        var today = new Date();
        today.setDate(today.getDate() - j - 1)
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = String(today.getFullYear());
        var week = mm + '/' + dd + '/' + yyyy;
        days.push(week)
    }
    console.log(days)
    var sql = `SELECT * FROM table WHERE Date LIKE '%${days[0]}%'`;
    for(var k = 1; k < days.length; k++){
        sql += ` OR Date LIKE '%${days[k]}%'`
    }
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await lists;*/
    var sql = "SELECT * FROM table"
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await lists;
  }

  async getMonth(){
    /*Code for working with fiffrent Database
    var days = []
    for(var j = 0; j < 30; j++){
        var today = new Date();
        today.setDate(today.getDate() - j - 1)
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = String(today.getFullYear());
        var week = mm + '/' + dd + '/' + yyyy;
        days.push(week)
    }
    console.log(days)
    var sql = `SELECT * FROM table WHERE Date LIKE '%${days[0]}%'`;
    for(var k = 1; k < days.length; k++){
        sql += ` OR Date LIKE '%${days[k]}%'`
    }
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await lists;*/
    var sql = "SELECT * FROM table"
    let lists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await lists;
  }

}

module.exports.MySQLdb = MySQLdb;