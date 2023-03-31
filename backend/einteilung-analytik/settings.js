const db = require("../database/communication4analytik");
let mySQl = new db.MySQLdb();

async function addBreakTime(app){
    app.post("/einteilungAnalytik/addBT", async (req, res) => {
        var dep = req.body.dep
        var val = req.body.value
        await mySQl.addSettings("BreakTime", dep, val)
        res.status(200).send({text:"break time added"})
    })
}

async function deleteBreakTime(app){
    app.post("/einteilungAnalytik/delBT", async (req, res) => {
        var dep = req.body.dep
        var val = req.body.value
        await mySQl.deleteSettings("BreakTime", dep, val)
        res.status(200).send({text:"break time deleted"})
    })
}

async function getSettings(app){
    app.post("/einteilungAnalytik/getSet", async (req, res) => {
        var dep = req.body.dep
        var sett = req.body.sett
        var Settings = await mySQl.getSettings(sett, dep)
        res.status(200).send({text:Settings})
    })
}

async function getMa(app) {
    app.get("/einteilungAnalytik/MaSettings", async (req, res) => {
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
    app.post("/einteilungAnalytik/addGroup", async (req, res) => {
      var group = req.body.group;
      mySQl.addGroup(group);
      res.status(200).send({ text: "group added" });
    });
  }
  
  async function remGroup(app) {
    app.post("/einteilungAnalytik/remGroup", async (req, res) => {
      var group = req.body.group;
      mySQl.remGroup(group);
      res.status(200).send({ text: "group removed" });
    });
  }
  
  async function getGroups(app) {
    app.get("/einteilungAnalytik/getGroups", async (req, res) => {
      var list = await mySQl.getGroups();
      res.status(200).send({ text: list });
    });
  }
  
  async function addSkill(app) {
    app.post("/einteilungAnalytik/addSkill", async (req, res) => {
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
    app.post("/einteilungAnalytik/remSkill", async (req, res) => {
      var skill = req.body.skill;
      var name = req.body.name;
      await mySQl.remSkill(name, skill) // muss als nächstes gemacht werden
      res.status(200).send({ text: "skill removed" });
    });
  }
  
  async function getSkills(app) {
    app.get("/einteilungAnalytik/getSkills", async (req, res) => {
      var list = await mySQl.getSkills();
      res.status(200).send({ text: list });
    });
  }

  async function updateRoleGroup(app) {
    app.post("/einteilungAnalytik/upRoleGroup", async (req, res) => {
      var role = req.body.role;
      var group = req.body.group;
      await mySQl.updateRoleGroup(group, role) // muss als nächstes gemacht werden
      res.status(200).send({ text: "Group to Role updated" });
    });
  }

async function updateWish(app) {
  app.post("/einteilungAnalytik/upWish", async (req, res) => {
    var wish = req.body.wish;
    var person = req.body.person;
    var pos = req.body.pos
    mySQl.addWish(person, wish, pos)
    res.status(200).send({ text: "Wish got added" });
  });
}

async function remWish(app) {
  app.post("/einteilungAnalytik/remWish", async (req, res) => {
    var wish = req.body.wish;
    var person = req.body.person;
    var pos = req.body.pos
    mySQl.remWish(person, wish, pos)
    res.status(200).send({ text: "Wish got removed" });
  });
}

async function getWish(app) {
  app.get("/einteilungAnalytik/getWish", async (req, res) => {
    var list = await mySQl.getWish();
    var arr = []
    for (var i = 0; i < list.length; i++) {
      var obj = {}
      if (arr.some(e => Object.keys(e)[0] == list[i].name)) {
        continue
      } else {
        obj[list[i].name] = {good:[], ok:[], no:[]}
        arr.push(obj)
      }
    }
    for(var j = 0; j < list.length; j++){
      for(var g = 0; g < arr.length; g++){
        if(Object.keys(arr[g])[0] == list[j].name && list[j].good != ""){
          arr[g][list[j].name].good.push(list[j].good)
          break
        }
        if(Object.keys(arr[g])[0] == list[j].name && list[j].ok != ""){
          arr[g][list[j].name].ok.push(list[j].ok)
          break
        }
        if(Object.keys(arr[g])[0] == list[j].name && list[j].no != ""){
          arr[g][list[j].name].no.push(list[j].no)
          break
        }
      }
    }
    res.status(200).send({ text: arr });
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
    updateWish,
    remWish,
    getWish
  };
  
  module.exports = data;