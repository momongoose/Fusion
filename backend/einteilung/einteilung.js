const db = require("../database/communication4");
let mySQl = new db.MySQLdb();

async function insertRole(app){
    app.post("/einteilung/role", async (req, res) => {
        var role = req.body.role
        mySQl.addRole(role.role, role.schicht, role.pos)
        res.status(200).send({text:"role inserted"})
    })
}
async function getRoles(app){
    app.get("/einteilung/roles", async (req, res) => {
        var roles = await mySQl.getRoles()
        roles = roles.sort((a, b) => {
            if (a.pos < b.pos) {
              return -1;
            }
          });
        res.status(200).send(roles)
    })
}

async function deleteRole(app){
    app.post("/einteilung/remrole", async (req, res) => {
        var role = req.body.role
        mySQl.deleteRole(role.role, role.schicht)
        res.status(200).send({text:"role deleted"})
    })
}

async function insertEinteilungF(app){
    app.post("/einteilung/einF", async (req, res) => {
        var ein = req.body.ein
        var date = new Date(req.body.date)
        date.setDate(date.getDate() + 2);
        date = date.toISOString()
        var esist = await mySQl.checkEinteilung(date.substring(0,10), "f")
        if(esist == false) {
            for(var i = 0; i < ein.length; i++){
                var role = ein[i].id.slice(0, -1)
                var list = ein[i].list
                await mySQl.updateColor(role, ein[i].color, "f")
                for(var j = 0; j < list.length; j++){
                    if(list[j].name == ""){
                        continue;
                    }
                    await mySQl.addEinteilung(role, list[j].name, date.substring(0,10), "f", list[j].state) 
                }
            }
            res.status(200).send({text:"einF inserted"})
        } else {
            for(var i = 1; i < ein.length; i++){
                var role = ein[i].id.slice(0, -1)
                var list = ein[i].list
                await mySQl.updateColor(role, ein[i].color, "f")
                for(var j = 0; j < list.length; j++){
                    if(list[j].name == ""){
                        continue;
                    }
                    await mySQl.updateEinteilungComment(list[j].name, date.substring(0,10), list[j].state )
                    await mySQl.updateEinteilung(role, list[j].name, date.substring(0,10), "f")
                }
            }
            res.status(200).send({text:"einF updated"})
        }
    })
}

async function insertMitarbeiter(app){
    app.post("/einteilung/addMA", async (req, res) => {
        var ma = req.body.ma
        var type = req.body.type
        var date = new Date(req.body.date)
        date.setDate(date.getDate() + 2);
        date = date.toISOString()
        var esist = await mySQl.checkEinteilung(date.substring(0,10), type)
        if(esist == false) {
            res.status(200).send({text:"Einteilung doesn't exist"})
        } else {
            await mySQl.addEinteilung("Mitarbeiter", ma, date.substring(0,10), type, "")
            res.status(200).send({text:"MA inserted"})
        }
    })
}

async function insertEinteilungS(app){
    app.post("/einteilung/einS", async (req, res) => {
        var ein = req.body.ein
        var date = new Date(req.body.date)
        date.setDate(date.getDate() + 2);
        date = date.toISOString()
        var esist = await mySQl.checkEinteilung(date.substring(0,10), "s")
        if(esist == false) {
            for(var i = 0; i < ein.length; i++){
                var role = ein[i].id.slice(0, -1)
                var list = ein[i].list
                await mySQl.updateColor(role, ein[i].color, "s")
                for(var j = 0; j < list.length; j++){
                    if(list[j].name == ""){
                        continue;
                    }
                    await mySQl.addEinteilung(role, list[j].name, date.substring(0,10), "s", list[j].state)
                }
            }
            res.status(200).send({text:"einS inserted"})
        } else {
            for(var i = 0; i < ein.length; i++){
                var role = ein[i].id.slice(0, -1)
                var list = ein[i].list
                await mySQl.updateColor(role, ein[i].color, "s")
                for(var j = 0; j < list.length; j++){
                    if(list[j].name == ""){
                        continue;
                    }
                    await mySQl.updateEinteilungComment(list[j].name, date.substring(0,10), list[j].state )
                    await mySQl.updateEinteilung(role, list[j].name, date.substring(0,10), "s")
                }
            }
            res.status(200).send({text:"einS updated"})
        }
    })
}

async function insertEinteilungN(app){
    app.post("/einteilung/einN", async (req, res) => {
        var ein = req.body.ein
        var date = new Date(req.body.date)
        date.setDate(date.getDate() + 2);
        date = date.toISOString()
        var esist = await mySQl.checkEinteilung(date.substring(0,10), "n")
        if(esist == false) {
            for(var i = 0; i < ein.length; i++){
                var role = ein[i].id.slice(0, -1)
                var list = ein[i].list
                await mySQl.updateColor(role, ein[i].color, "n")
                for(var j = 0; j < list.length; j++){
                    if(list[j].name == ""){
                        continue;
                    }
                    await mySQl.addEinteilung(role, list[j].name, date.substring(0,10), "n", list[j].state)
                }
            }
            res.status(200).send({text:"einN inserted"})
        } else {
            for(var i = 0; i < ein.length; i++){
                var role = ein[i].id.slice(0, -1)
                var list = ein[i].list
                await mySQl.updateColor(role, ein[i].color, "n")
                for(var j = 0; j < list.length; j++){
                    if(list[j].name == ""){
                        continue;
                    }
                    await mySQl.updateEinteilungComment(list[j].name, date.substring(0,10), list[j].state )
                    await mySQl.updateEinteilung(role, list[j].name, date.substring(0,10), "n")
                }
            }
            res.status(200).send({text:"einN updated"})
        }
    })
}

async function updateBreak(app){
    app.post("/einteilung/upBreak", async (req, res) => {
        var ma = req.body.ma
        var date = new Date(req.body.date)
        date.setDate(date.getDate() + 2)
        date = formatDate(date)
        var brek = req.body.brek
        await mySQl.updateBreak(ma,date,brek)
        res.status(200).send({text:"break updated"})
    })
}

async function rename(app){
    app.post("/einteilung/ren", async (req, res) => {
        var value = req.body.value
        await mySQl.rename(value.new, value.old, value.schicht)
        res.status(200).send({text:"renamed"})
    })
}

async function updatePos(app){
    app.post("/einteilung/upPos", async (req, res) => {
        var pos = req.body.pos
        var value = req.body.value
        var pos2 = req.body.pos2
        var value2 = req.body.value2
        await mySQl.updatePos(pos, pos2, value, value2)
        res.status(200).send({text:"Pos updated"})
    })
}

async function remEin(app){
    app.post("/einteilung/remEin", async (req, res) => {
        var person = req.body.person
        var date = new Date(req.body.date)
        date.setDate(date.getDate() + 2)
        date = formatDate(date)
        await mySQl.remEinteilung(person, date)
        res.status(200).send({text:"Einteilung removed"})
    })
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

async function getEinteilung(app) {
    app.post("/einteilung/teilung", async (req, res) => {
        var date = new Date(req.body.date)
        date.setDate(date.getDate() + 2)
        date = formatDate(date)
        var esist = false
        var esistf = await mySQl.checkEinteilung(date, "f")
        var esists = await mySQl.checkEinteilung(date, "s")
        var esistn = await mySQl.checkEinteilung(date, "n")
        if(esistf == true || esists == true || esistn == true){
            esist = true
        }
        var einteilung = await mySQl.getEinteilung(date)
        res.status(200).send({text:einteilung, exist: esist})
    })
}

async function getStats(app){
    app.get("/einteilung/getStats", async (req, res) => {
        var stats = await mySQl.getCounts()
        res.status(200).send(stats)
    })
}

const data = {
    insertRole,
    getRoles,
    deleteRole,
    getEinteilung,
    insertEinteilungF,
    insertEinteilungS,
    insertEinteilungN,
    insertMitarbeiter,
    updatePos,
    rename,
    updateBreak,
    remEin,
    getStats
  };
  
  module.exports = data;