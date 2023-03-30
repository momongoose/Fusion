const dbConfig = require("../config/db_config");

class MySQLdb {
  constructor() {
    this.mysql = require("mysql2");
    this.db = this.mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PAS,
      database: dbConfig.DBC,
    });
  }

  async checktable(date, type) {
    var exist = false;
    var sql =
      "SELECT * FROM table AS ein INNER JOIN table AS rl ON ein.table_id = rl.table_id WHERE date = " +
      this.mysql.escape(date) +
      "";
    let ein = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not check table! for " + date);
    });
    if ((await ein) == undefined || (await ein.length) < 1) {
      exist = false;
    } else {
      for (var x = 0; x < ein.length; x++) {
        if (ein[x].type == type) {
          exist = true;
          return exist;
        } else {
          exist = false;
        }
      }
    }
    return exist;
  }

  async gettable(date) {
    var sql =
      "SELECT * FROM table AS ein INNER JOIN table AS rl ON ein.table_id = rl.table_id WHERE ein.date = " +
      this.mysql.escape(date) +
      "";
    let ein = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get table! on " + date);
    });
    return await ein;
  }

  async updatetable(tableId, name, date, type) {
    var sql =
      "UPDATE table SET table_id = (SELECT table_id from table where type = " +
      this.mysql.escape(type) +
      " and table like " +
      this.mysql.escape(tableId) +
      ") WHERE name = " +
      this.mysql.escape(name) +
      " AND date = " +
      this.mysql.escape(date) +
      "";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not update table! for " + name + " on " + date);
    });
  }

  async updatetableComment(name, date, state) {
    var sql =
      "UPDATE table SET comment = " +
      this.mysql.escape(state) +
      " WHERE name = " +
      this.mysql.escape(name) +
      " AND date = " +
      this.mysql.escape(date) +
      "";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log(
        "could not update Comment in table! for " + name + " on " + date
      );
    });
  }

  async addtable(table, type, pos) {
    var sql =
      "INSERT INTO table (type, table, pos, color) VALUES (" +
      this.mysql.escape(type) +
      ", " +
      this.mysql.escape(table) +
      ", " +
      this.mysql.escape(pos) +
      ", '')";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(" table added in table list");
        }
      });
    }).catch(() => {
      console.log("there was an error adding table in the table list!");
    });
  }

  //async updatePos(table_id, pos){
  //  var sql = "UPDATE table SET pos = " + this.mysql.escape(pos)  + " WHERE table_id = " + this.mysql.escape(table_id)
  //  await new Promise((resolve, reject) => {
  //    this.db.query(sql, function (err, result) {
  //      if (err) {
  //        reject(err)
  //      };
  //      if(result){
  //        resolve(result)
  //      }
  //    });
  //  }).catch(() => {console.log("could not update Pos! ")});
  //}

  async updatePos(table_id, table_id2, pos, pos2) {
    var sql =
      "UPDATE table SET pos = " +
      this.mysql.escape(table_id) +
      " WHERE table_id = " +
      this.mysql.escape(pos);
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not update Pos! ");
    });
    var sql =
      "UPDATE table SET pos = " +
      this.mysql.escape(table_id2) +
      " WHERE table_id = " +
      this.mysql.escape(pos2);
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not update Pos2! ");
    });
  }

  async rename(table, old, type) {
    var sql =
      "UPDATE table SET table = " +
      this.mysql.escape(table) +
      " WHERE table = " +
      this.mysql.escape(old) +
      " AND type = " +
      this.mysql.escape(type);
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not update Name! ");
    });
  }

  async updateColor(table, color, type) {
    var sql =
      "UPDATE table SET color = " +
      this.mysql.escape(color) +
      " WHERE table = " +
      this.mysql.escape(table) +
      " AND type = " +
      this.mysql.escape(type);
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not update Color! ");
    });
  }

  async updateBreak(table, date, brek) {
    var sql =
      "UPDATE table SET break = " +
      this.mysql.escape(brek) +
      " WHERE date = " +
      this.mysql.escape(date) +
      " AND name = " +
      this.mysql.escape(table);
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not update Brek! ");
    });
  }

  async deletetable(table, type) {
    if (type == "f") {
      var sql1 =
        "UPDATE table SET table_id = 1 WHERE table_id = (SELECT table_id from table where type = " +
        this.mysql.escape(type) +
        " and table like " +
        this.mysql.escape(table) +
        ")";
      await new Promise((resolve, reject) => {
        this.db.query(sql1, function (err, result) {
          if (err) {
            reject(err);
          }
          if (result) {
            resolve(result);
          }
        });
      }).catch(() => {
        console.log("could not update F table! ");
      });
    } else if (type == "s") {
      var sql1 =
        "UPDATE table SET table_id = 2 WHERE table_id = (SELECT table_id from table where type = " +
        this.mysql.escape(type) +
        " and table like " +
        this.mysql.escape(table) +
        ")";
      await new Promise((resolve, reject) => {
        this.db.query(sql1, function (err, result) {
          if (err) {
            reject(err);
          }
          if (result) {
            resolve(result);
          }
        });
      }).catch(() => {
        console.log("could not update S table! ");
      });
    } else if (type == "n") {
      var sql1 =
        "UPDATE table SET table_id = 3 WHERE table_id = (SELECT table_id from table where type = " +
        this.mysql.escape(type) +
        " and table like " +
        this.mysql.escape(table) +
        ")";
      await new Promise((resolve, reject) => {
        this.db.query(sql1, function (err, result) {
          if (err) {
            reject(err);
          }
          if (result) {
            resolve(result);
          }
        });
      }).catch(() => {
        console.log("could not update N table! ");
      });
    }
    var sql2 =
      "Delete FROM table WHERE table = " +
      this.mysql.escape(table) +
      " AND type = " +
      this.mysql.escape(type);
    await new Promise((resolve, reject) => {
      this.db.query(sql2, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not delete table! ");
    });
  }

  async gettableID(table) {
    var sql =
      "SELECT table_id FROM table WHERE table = '" + this.mysql.escape(table) + "'";
    let tableId = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get table ID!");
    });
    return await tableId;
  }

  async gettable(setting, department) {
    var sql =
      "SELECT * FROM table WHERE setting = " +
      this.mysql.escape(setting) +
      " AND department = " +
      this.mysql.escape(department);
    let table = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get all table!");
    });
    return await table;
  }

  async addtable(setting, department, value) {
    var sql =
      "INSERT INTO table (setting, department, value, time) VALUES (" +
      this.mysql.escape(setting) +
      ", " +
      this.mysql.escape(department) +
      ", " +
      this.mysql.escape(value) +
      ", " +
      this.mysql.escape(value.concat(":00")) +
      ")";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(" table added in table list");
        }
      });
    }).catch(() => {
      console.log("there was an error adding a Setting in the table list!");
    });
  }

  async deletetable(setting, department, value) {
    var sql2 =
      "Delete FROM table WHERE setting = " +
      this.mysql.escape(setting) +
      " AND department = " +
      this.mysql.escape(department) +
      " AND value = " +
      this.mysql.escape(value);
    await new Promise((resolve, reject) => {
      this.db.query(sql2, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not delete Setting! ");
    });
  }

  async getCounts() {
    var sql =
      "SELECT table.name, table.table, COUNT(table.table_id) FROM table LEFT JOIN table ON table.table_id = table.table_id WHERE (table.table != 'Urlaub' AND table.table != 'Mitarbeiter' AND table.table != 'Krank' AND table.table IS NOT NULL) GROUP BY table.name, table.table";
    let list = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get Counts!");
    });
    return await list;
  }

  async gettables() {
    var sql = "SELECT * FROM table";
    let tables = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get all tables!");
    });
    return await tables;
  }

  addtable(tableId, name, date, type, state) {
    var sql =
      "INSERT INTO table (name, table_id, date, comment, break) VALUES (" +
      this.mysql.escape(name) +
      ", (SELECT table_id from table where type = " +
      this.mysql.escape(type) +
      " and table like " +
      this.mysql.escape(tableId) +
      "), " +
      this.mysql.escape(date) +
      ", " +
      this.mysql.escape(state) +
      ", '66:00:00')";
    new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(name + " added in table");
        }
      });
    }).catch(() => {
      console.log("there was an error adding Person in table!");
    });
  }

  async remtable(person, date) {
    var sql2 =
      "Delete FROM table WHERE name = " + this.mysql.escape(person) + " AND date =" + this.mysql.escape(date);
      await new Promise((resolve, reject) => {
      this.db.query(sql2, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not delete table! ");
    });
  }

  async getGroups() {
    var sql = "SELECT * FROM table";
    let groups = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get all Groups!");
    });
    return await groups;
  }

  async gettable() {
    var sql =
      "SELECT table.name, table.name AS 'good', table.table FROM table LEFT JOIN table ON table.name_id = table.id LEFT JOIN table ON table.good = table.group_id LEFT JOIN table ON table.wish = table.table_id WHERE table.good != 0;";
    let table = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get all table!");
    });
    var sql =
      "SELECT table.name, table.name AS 'ok', table.table FROM table LEFT JOIN table ON table.name_id = table.id RIGHT JOIN table ON table.ok = table.group_id LEFT JOIN table ON table.wish = table.table_id WHERE table.ok != 0;";
    let table2 = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get all table!");
    });
    var sql =
      "SELECT table.name, table.name AS 'no', table.table FROM table LEFT JOIN table ON table.name_id = table.id RIGHT JOIN table ON table.no = table.group_id LEFT JOIN table ON table.wish = table.table_id WHERE table.no != 0;";
    let table3 = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get all table!");
    });
    var sql =
      "SELECT table.name, table.name AS 'groups', table.table FROM table LEFT JOIN table ON table.name_id = table.id RIGHT JOIN table ON table.no = table.group_id LEFT JOIN table ON table.wish = table.table_id WHERE table.no = 0 AND table.ok = 0 AND table.good = 0;";
    let table4 = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get all table!");
    });
    table = [table, table2, table3, table4];
    return await table;
  }

  async gettable() {
    var sql = "SELECT * FROM table";
    let list = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get table!");
    });
    return await list;
  }

  async addGroup(name) {
    var sql =
      "INSERT INTO table (name) VALUES (" +
      this.mysql.escape(name) +
      ")";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(name + " added in groups");
        }
      });
    }).catch(() => {
      console.log("there was an error adding Group in Groups!");
    });
  }

  async addSkillGood(name, group) {
    var sql =
      "INSERT INTO table (name_id, good) VALUES ((SELECT id from table where name = " +
      this.mysql.escape(name) +
      "), " +
      "" +
      this.mysql.escape(group) +
      ")";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(name + " added in good table");
        }
      });
    }).catch(() => {
      console.log("there was an error adding a good Skill!");
    });
  }

  async addSkillOk(name, group) {
    var sql =
      "INSERT INTO table (name_id, ok) VALUES ((SELECT id from table where name = " +
      this.mysql.escape(name) +
      "), " +
      "" +
      this.mysql.escape(group) +
      ")";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(name + " added in ok table");
        }
      });
    }).catch(() => {
      console.log("there was an error adding a ok Skill!");
    });
  }

  async addSkillNo(name, group) {
    var sql =
      "INSERT INTO table (name_id, no) VALUES ((SELECT id from table where name = " +
      this.mysql.escape(name) +
      "), " +
      "" +
      this.mysql.escape(group) +
      ")";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(name + " added in no table");
        }
      });
    }).catch(() => {
      console.log("there was an error adding a no Skill!");
    });
  }

  async remGroup(group) {
    var sql2 =
      "Delete FROM table WHERE group_id = " + this.mysql.escape(group);
    await new Promise((resolve, reject) => {
      this.db.query(sql2, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not delete Group! ");
    });
  }

  async remSkill(name, group) {
    var sql2 =
      "Delete FROM table WHERE name_id = (SELECT id FROM table WHERE name = " +
      this.mysql.escape(name) +
      ") AND (good = " +
      this.mysql.escape(group) +
      " OR ok = " +
      this.mysql.escape(group) +
      " OR no = " +
      this.mysql.escape(group) +
      ")";
    await new Promise((resolve, reject) => {
      this.db.query(sql2, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not delete Skill! ");
    });
  }

  async updatetableGroup(group, table) {
    var sql =
      "UPDATE table SET table.group = (SELECT name FROM table WHERE group_id = " +
      this.mysql.escape(group) +
      ") WHERE table.table_id = " +
      this.mysql.escape(table);
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not update table in Group! ");
    });
  }

  async checkWish(name) {
    var exist = false;
    var sql =
      "SELECT * FROM table INNER JOIN table ON table.name_id = table.id WHERE table.name = " +
      this.mysql.escape(name) +
      "";
    let ein = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not check table! for " + date);
    });
    if ((await ein) == undefined || (await ein.length) < 1) {
      exist = false;
    } else {
      exist = true;
      return exist;
    }
    return exist;
  }

  async addWish(name, wish) {
    var sql =
      "INSERT INTO table (name_id, wish) VALUES ((SELECT id from table where name = " +
      this.mysql.escape(name) +
      "), " +
      "" +
      this.mysql.escape(wish) +
      ")";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(name + " added Wish");
        }
      });
    }).catch(() => {
      console.log("there was an error adding a Wish!");
    });
  }

  async updateWish(name, wish) {
    var sql =
      "UPDATE table SET wish = " +
      this.mysql.escape(wish) +
      " WHERE name_id = (SELECT id from table where name = " +
      this.mysql.escape(name) +
      ")";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not update Wish! ");
    });
  }
}

module.exports.MySQLdb = MySQLdb;
