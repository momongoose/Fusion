const express = require("express")
const cors = require("cors")
const helmet = require("helmet");
const compressor = require("compression");
const checkLogin = require("./login/login");
const form = require("./form/form")
const error = require("./error/error");
const janus = require("./form/janus")
const udata = require("./einteilung/UserData")
const ein = require("./einteilung/einteilung")
const sett = require("./einteilung/settings")
const udataAnal = require("./einteilung-anal/UserData")
const einAnal = require("./einteilung-anal/einteilung")
const settAnal = require("./einteilung-anal/settings")
const udataPrae = require("./einteilung-prä/UserData")
const einPrae = require("./einteilung-prä/einteilung")
const settPrae = require("./einteilung-prä/settings")

const app = express()
const port =  process.env.PORT || 8080;

var corsOptions = {
    origin: "http://localhost:4200", 
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compressor());
app.listen(port, () => {
    console.log(`App listening on Port ${port}`)
})

function main(){
    initial();
}

function initial() {
    console.log("initializing")
    checkLogin(app);
    form(app);
    error.getNew(app)
    error.getOld(app)
    error.update(app)
    janus(app)
    udata.getAllf(app)
    udata.getAlls(app)
    udata.getAlln(app)
    ein.deleteRole(app)
    ein.insertEinteilungF(app)
    ein.insertEinteilungS(app)
    ein.insertEinteilungN(app)
    ein.insertRole(app)
    ein.getRoles(app)
    ein.getEinteilung(app)
    ein.insertMitarbeiter(app)
    ein.updatePos(app)
    ein.rename(app)
    ein.updateBreak(app)
    ein.remEin(app)
    ein.getStats(app)
    sett.addBreakTime(app)
    sett.deleteBreakTime(app)
    sett.getSettings(app)
    sett.getMa(app)
    sett.addGroup(app)
    sett.remGroup(app)
    sett.getGroups(app)
    sett.addSkill(app)
    sett.remSkill(app)
    sett.getSkills(app)
    sett.updateRoleGroup(app)
    sett.updateWish(app)

    udataAnal.getAllf(app)
    udataAnal.getAlls(app)
    udataAnal.getAlln(app)
    einAnal.deleteRole(app)
    einAnal.insertEinteilungF(app)
    einAnal.insertEinteilungS(app)
    einAnal.insertEinteilungN(app)
    einAnal.insertRole(app)
    einAnal.getRoles(app)
    einAnal.getEinteilung(app)
    einAnal.insertMitarbeiter(app)
    einAnal.updatePos(app)
    einAnal.rename(app)
    einAnal.remEin(app)
    einAnal.getStats(app)
    einAnal.updateBreak(app)
    settAnal.addBreakTime(app)
    settAnal.deleteBreakTime(app)
    settAnal.getSettings(app)
    settAnal.getMa(app)
    settAnal.addGroup(app)
    settAnal.remGroup(app)
    settAnal.getGroups(app)
    settAnal.addSkill(app)
    settAnal.remSkill(app)
    settAnal.getSkills(app)
    settAnal.updateRoleGroup(app)
    settAnal.updateWish(app)
    settAnal.remWish(app)
    settAnal.getWish(app)

    udataPrae.getAllf(app)
    udataPrae.getAlls(app)
    udataPrae.getAlln(app)
    einPrae.deleteRole(app)
    einPrae.insertEinteilungF(app)
    einPrae.insertEinteilungS(app)
    einPrae.insertEinteilungN(app)
    einPrae.insertRole(app)
    einPrae.getRoles(app)
    einPrae.getEinteilung(app)
    einPrae.insertMitarbeiter(app)
    einPrae.updatePos(app)
    einPrae.rename(app)
    einPrae.updateBreak(app)
    einPrae.remEin(app)
    einPrae.getStats(app)
    settPrae.addBreakTime(app)
    settPrae.deleteBreakTime(app)
    settPrae.getSettings(app)
    settPrae.getMa(app)
    settPrae.addGroup(app)
    settPrae.remGroup(app)
    settPrae.getGroups(app)
    settPrae.addSkill(app)
    settPrae.remSkill(app)
    settPrae.getSkills(app)
    settPrae.updateRoleGroup(app)
    settPrae.updateWish(app)
}

main();

module.exports = app