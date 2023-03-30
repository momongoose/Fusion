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

  async checkEinteilung(date, type) {
    var exist = false;
    var sql =
      "SELECT * FROM table AS ein INNER JOIN table AS rl ON ein.role_id = rl.role_id WHERE date = " +
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
      console.log("could not check Einteilung! for " + date);
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

  async getEinteilung(date) {
    var sql =
      "SELECT * FROM table AS ein INNER JOIN table AS rl ON ein.role_id = rl.role_id WHERE ein.date = " +
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
      console.log("could not get Einteilung! on " + date);
    });
    return await ein;
  }

  async updateEinteilung(roleId, name, date, type) {
    var sql =
      "UPDATE table SET role_id = (SELECT role_id from table where type = " +
      this.mysql.escape(type) +
      " and role like " +
      this.mysql.escape(roleId) +
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
      console.log("could not update Einteilung! for " + name + " on " + date);
    });
  }

  async updateEinteilungComment(name, date, state) {
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
        "could not update Comment in Einteilung! for " + name + " on " + date
      );
    });
  }

  async addRole(role, type, pos) {
    var sql =
      "INSERT INTO table (type, role, pos, color) VALUES (" +
      this.mysql.escape(type) +
      ", " +
      this.mysql.escape(role) +
      ", " +
      this.mysql.escape(pos) +
      ", '')";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(" Role added in role list");
        }
      });
    }).catch(() => {
      console.log("there was an error adding Role in the role list!");
    });
  }

  //async updatePos(role_id, pos){
  //  var sql = "UPDATE role SET pos = " + this.mysql.escape(pos)  + " WHERE role_id = " + this.mysql.escape(role_id)
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

  async updatePos(role_id, role_id2, pos, pos2) {
    var sql =
      "UPDATE table SET pos = " +
      this.mysql.escape(role_id) +
      " WHERE role_id = " +
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
      this.mysql.escape(role_id2) +
      " WHERE role_id = " +
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

  async rename(role, old, type) {
    var sql =
      "UPDATE table SET role = " +
      this.mysql.escape(role) +
      " WHERE role = " +
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

  async updateColor(role, color, type) {
    var sql =
      "UPDATE table SET color = " +
      this.mysql.escape(color) +
      " WHERE role = " +
      this.mysql.escape(role) +
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

  async updateBreak(ma, date, brek) {
    var sql =
      "UPDATE table SET break = " +
      this.mysql.escape(brek) +
      " WHERE date = " +
      this.mysql.escape(date) +
      " AND name = " +
      this.mysql.escape(ma);
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

  async deleteRole(role, type) {
    var sql2 =
      "UPDATE table SET active = 0 WHERE role = " +
      this.mysql.escape(role) +
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
      console.log("could not delete Role! ");
    });
  }

  async getRoleID(role) {
    var sql =
      "SELECT role_id FROM table WHERE role = '" +
      this.mysql.escape(role) +
      "'";
    let roleId = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get Role ID!");
    });
    return await roleId;
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
          resolve(" Role added in role list");
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

  async getRoles() {
    var sql = "SELECT * FROM table";
    let roles = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get all Roles!");
    });
    return await roles;
  }

  addEinteilung(roleId, name, date, type, state) {
    var sql =
      "INSERT INTO table (name, role_id, date, comment, break) VALUES (" +
      this.mysql.escape(name) +
      ", (SELECT role_id from table where type = " +
      this.mysql.escape(type) +
      " and role like " +
      this.mysql.escape(roleId) +
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
      console.log("there was an error adding Person in Einteilung!");
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

  async getCounts() {
    var sql =
      "SELECT table.name, table.role, COUNT(table.role_id) FROM table LEFT JOIN table ON table.role_id = table.role_id WHERE (table.role != 'Urlaub' AND table.role != 'Mitarbeiter' AND table.role != 'Krank' AND table.role IS NOT NULL) GROUP BY table.name, table.role";
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

  async getSkills() {
    var sql =
      "SELECT table.name, table.name AS 'good', table.role FROM table LEFT JOIN table ON table.name_id = table.id LEFT JOIN table ON table.good = table.group_id LEFT JOIN table ON table.wish = table.role_id WHERE table.good != 0;";
    let skills = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get all Skills!");
    });
    var sql =
    "SELECT table.name, table.name AS 'ok', table.role FROM table LEFT JOIN table ON table.name_id = table.id LEFT JOIN table ON table.ok = table.group_id LEFT JOIN table ON table.wish = table.role_id WHERE table.ok != 0;";
    let skills2 = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get all Skills!");
    });
    var sql =
    "SELECT table.name, table.name AS 'no', table.role FROM table LEFT JOIN table ON table.name_id = table.id LEFT JOIN table ON table.no = table.group_id LEFT JOIN table ON table.wish = table.role_id WHERE table.no != 0;";
    let skills3 = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get all Skills!");
    });
    var sql =
      "SELECT table.name, table.name AS 'groups', table.role FROM table LEFT JOIN table ON table.name_id = table.id RIGHT JOIN table ON table.no = table.group_id LEFT JOIN table ON table.wish = table.role_id WHERE table.no = 0 AND table.ok = 0 AND table.good = 0;";
    let skills4 = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch(() => {
      console.log("could not get all Skills!");
    });
    skills = [skills, skills2, skills3, skills4];
    return await skills;
  }

  async getMa() {
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
      console.log("could not get Ma!");
    });
    return await list;
  }

  async addGroup(name) {
    var sql =
      "INSERT INTO table (name) VALUES (" + this.mysql.escape(name) + ")";
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
          resolve(name + " added in good Skills");
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
          resolve(name + " added in ok Skills");
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
          resolve(name + " added in no Skills");
        }
      });
    }).catch(() => {
      console.log("there was an error adding a no Skill!");
    });
  }

  async remEinteilung(person, date) {
    var sql2 =
      "Delete FROM table WHERE name = " +
      this.mysql.escape(person) +
      " AND date = " +
      this.mysql.escape(date);
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
      console.log("could not delete Einteilung! ");
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
    console.log(sql2);
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

  async updateRoleGroup(group, role) {
    var sql =
      "UPDATE table SET table.group = (SELECT name FROM table WHERE group_id = " +
      this.mysql.escape(group) +
      ") WHERE table.role_id = " +
      this.mysql.escape(role);
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
      console.log("could not update Role in Group! ");
    });
  }
  
  async getWish() {
    var sql = "SELECT table.name, rG.role AS good, rO.role AS ok, rN.role AS no FROM table LEFT JOIN table ON table.name_id = table.id LEFT JOIN table AS rG ON table.good = rG.role_id LEFT JOIN table AS rO ON table.ok = rO.role_id LEFT JOIN table AS rN ON table.no = rN.role_id";
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
      console.log("could not get all Groups!");
    });
    return await list;
  }

  async addWish(name, wish, pos) {
    var sql =
      "INSERT INTO table (name_id, ".concat(this.mysql.escape(pos)).replace(/'/g, "") + ") VALUES ((SELECT id from table where name = " +
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

  async remWish(name, wish, pos) {
    var sql =
      "DELETE FROM table WHERE ".concat(this.mysql.escape(pos)).replace(/'/g, "") + " = " + this.mysql.escape(wish) + " AND name_id = (SELECT id from table where name = " +
      this.mysql.escape(name) +
      ")" ;
            console.log(sql)
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(name + " added Wish");
        }
      });
    }).catch(() => {
      console.log("there was an error removing a Wish!");
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
