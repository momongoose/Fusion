const db = require("../database/communication4prae");
let mySQl = new db.MySQLdb();

async function addBreakTime(app){
    app.post("/einteilungPraeanalytik/addBT", async (req, res) => {
        var dep = req.body.dep
        var val = req.body.value
        await mySQl.addSettings("BreakTime", dep, val)
        res.status(200).send({text:"break time added"})
    })
}

async function deleteBreakTime(app){
    app.post("/einteilungPraeanalytik/delBT", async (req, res) => {
        var dep = req.body.dep
        var val = req.body.value
        await mySQl.deleteSettings("BreakTime", dep, val)
        res.status(200).send({text:"break time deleted"})
    })
}

async function getSettings(app){
    app.post("/einteilungPraeanalytik/getSet", async (req, res) => {
        var dep = req.body.dep
        var sett = req.body.sett
        var Settings = await mySQl.getSettings(sett, dep)
        res.status(200).send({text:Settings})
    })
}

async function getMa(app) {
    app.get("/einteilungPraeanalytik/MaSettings", async (req, res) => {
      var list = await mySQl.getMa();
      var skill = await mySQl.getSkills();
      var arr = []
      for (var i = 0; i < list.length; i++) {
        list[i].good = [];
        list[i].ok = [];
        list[i].no = [];
        list[i].wish = "";
        arr.push(list[i].name)
      }
      
      for (var i = 0; i < skill[0].length; i++) {
          if(arr.includes(skill[0][i].name)){
              for (var j = 0; j < list.length; j++) {
                  if(list[j].name == skill[0][i].name){
                      list[j].good.push(skill[0][i].good);
                      if(skill[0][i].role != null){
                        list[j].wish = skill[0][i].role
                      }
                  }
                }
          }
      }
      for (var i = 0; i < skill[1].length; i++) {
          if(arr.includes(skill[1][i].name)){
              for (var j = 0; j < list.length; j++) {
                  if(list[j].name == skill[1][i].name){
                      list[j].ok.push(skill[1][i].ok);
                      if(skill[1][i].role != null){
                        list[j].wish = skill[1][i].role
                      }
                  }
                }
          }
      }
      for (var i = 0; i < skill[2].length; i++) {
          if(arr.includes(skill[2][i].name)){
              for (var j = 0; j < list.length; j++) {
                  if(list[j].name == skill[2][i].name){
                      list[j].no.push(skill[2][i].no);
                      if(skill[2][i].role != null){
                        list[j].wish = skill[2][i].role
                      }
                  }
              }
          }
      }
      for (var i = 0; i < skill[3].length; i++) {
        if(arr.includes(skill[3][i].name)){
            for (var j = 0; j < list.length; j++) {
                if(list[j].name == skill[3][i].name){
                    if(skill[3][i].role != null){
                      list[j].wish = skill[3][i].role
                    }
                }
            }
        }
    }
      res.status(200).send(list);
    });
  }
  
  async function addGroup(app) {
    app.post("/einteilungPraeanalytik/addGroup", async (req, res) => {
      var group = req.body.group;
      mySQl.addGroup(group);
      res.status(200).send({ text: "group added" });
    });
  }
  
  async function remGroup(app) {
    app.post("/einteilungPraeanalytik/remGroup", async (req, res) => {
      var group = req.body.group;
      mySQl.remGroup(group);
      res.status(200).send({ text: "group removed" });
    });
  }
  
  async function getGroups(app) {
    app.get("/einteilungPraeanalytik/getGroups", async (req, res) => {
      var list = await mySQl.getGroups();
      res.status(200).send({ text: list });
    });
  }
  
  async function addSkill(app) {
    app.post("/einteilungPraeanalytik/addSkill", async (req, res) => {
      var skill = req.body.skill;
      var type = req.body.type;
      var name = req.body.name;
      if(type == "good"){
          await mySQl.addSkillGood(name, skill)
      } else if(type == "ok") {
          await mySQl.addSkillOk(name, skill)
      } else if(type == "no"){
          await mySQl.addSkillNo(name, skill)
      }
      res.status(200).send({ text: "skill added" });
    });
  }
  
  async function remSkill(app) {
    app.post("/einteilungPraeanalytik/remSkill", async (req, res) => {
      var skill = req.body.skill;
      var name = req.body.name;
      await mySQl.remSkill(name, skill) // muss als nächstes gemacht werden
      res.status(200).send({ text: "skill removed" });
    });
  }
  
  async function getSkills(app) {
    app.get("/einteilungPraeanalytik/getSkills", async (req, res) => {
      var list = await mySQl.getSkills();
      res.status(200).send({ text: list });
    });
  }

  async function updateRoleGroup(app) {
    app.post("/einteilungPraeanalytik/upRoleGroup", async (req, res) => {
      var role = req.body.role;
      var group = req.body.group;
      await mySQl.updateRoleGroup(group, role) // muss als nächstes gemacht werden
      res.status(200).send({ text: "Group to Role updated" });
    });
  }

  async function updateWish(app) {
    app.post("/einteilungPraeanalytik/upWish", async (req, res) => {
      var wish = req.body.wish;
      var person = req.body.person;
      var exist = await mySQl.checkWish(person)
      if(exist == false){
         await mySQl.addWish(person, wish)
      } else {
        await mySQl.updateWish(person, wish)
      }
      //await mySQl.updateRoleGroup(group, role) // muss als nächstes gemacht werden
      res.status(200).send({ text: "Wish got updated" });
    });
  }

const data = {
    addBreakTime,
    deleteBreakTime,
    getSettings,
    getMa,
    addGroup,
    remGroup,
    getGroups,
    addSkill,
    remSkill,
    getSkills,
    updateRoleGroup,
    updateWish
  };
  
  module.exports = data;