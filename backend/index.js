const express = require("express")
const cors = require("cors")
const helmet = require("helmet");
const compressor = require("compression");
const checkLogin = require("./login/login");
const form = require("./form/form")
const error = require("./error/error");
const janus = require("./form/janus")
const update = require("./einteilung/UserData")
const ein = require("./einteilung/einteilung")
const sett = require("./einteilung/settings")
const updateAnalytik = require("./einteilung-analytik/UserData")
const einAnalytik = require("./einteilung-analytik/einteilung")
const settAnalytik = require("./einteilung-analytik/settings")
const updatePrae = require("./einteilung-prä/UserData")
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
    update.getAllf(app)
    update.getAlls(app)
    update.getAlln(app)
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

    updateAnalytik.getAllf(app)
    updateAnalytik.getAlls(app)
    updateAnalytik.getAlln(app)
    einAnalytik.deleteRole(app)
    einAnalytik.insertEinteilungF(app)
    einAnalytik.insertEinteilungS(app)
    einAnalytik.insertEinteilungN(app)
    einAnalytik.insertRole(app)
    einAnalytik.getRoles(app)
    einAnalytik.getEinteilung(app)
    einAnalytik.insertMitarbeiter(app)
    einAnalytik.updatePos(app)
    einAnalytik.rename(app)
    einAnalytik.remEin(app)
    einAnalytik.getStats(app)
    einAnalytik.updateBreak(app)
    settAnalytik.addBreakTime(app)
    settAnalytik.deleteBreakTime(app)
    settAnalytik.getSettings(app)
    settAnalytik.getMa(app)
    settAnalytik.addGroup(app)
    settAnalytik.remGroup(app)
    settAnalytik.getGroups(app)
    settAnalytik.addSkill(app)
    settAnalytik.remSkill(app)
    settAnalytik.getSkills(app)
    settAnalytik.updateRoleGroup(app)
    settAnalytik.updateWish(app)
    settAnalytik.remWish(app)
    settAnalytik.getWish(app)

    updatePrae.getAllf(app)
    updatePrae.getAlls(app)
    updatePrae.getAlln(app)
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