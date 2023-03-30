const db = require("../database/communication3prae");
let mySQl = new db.MySQLdb();

async function getAllf(app) {
    app.post("/einteilungPraeanalytik/f", async (req, res) => {
        var date = new Date(req.body.date)
        date.setDate(date.getDate() + 2);
        date = date.toISOString().substring(0, 10)
        var users = await mySQl.getFusers(date)
        res.status(200).send(users)
    })
}

async function getAlls(app) {
    app.post("/einteilungPraeanalytik/s", async (req, res) => {
        var date = new Date(req.body.date)
        date.setDate(date.getDate() + 2);
        date = date.toISOString().substring(0, 10)
        var users = await mySQl.getSusers(date)
        res.status(200).send(users)
    })
}

async function getAlln(app) {
    app.post("/einteilungPraeanalytik/n", async (req, res) => {
        var date = new Date(req.body.date)
        date.setDate(date.getDate() + 2);
        date = date.toISOString().substring(0, 10)
        var users = await mySQl.getNusers(date)
        res.status(200).send(users)
    })
}

const data = {
    getAllf,
    getAlls,
    getAlln,
  };
  
  module.exports = data;