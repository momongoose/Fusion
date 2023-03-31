const db = require("../database/communication3analytik");
let mySQl = new db.MySQLdb();

async function getAllf(app) {
    app.post("/einteilungAnalytik/f", async (req, res) => {
        var date = new Date(req.body.date)
        date.setDate(date.getDate() + 2);
        date = date.toISOString().substring(0, 10)
        var users = await mySQl.getFusers(date)
        res.status(200).send(users)
    })
}

async function getAlls(app) {
    app.post("/einteilungAnalytik/s", async (req, res) => {
        var date = new Date(req.body.date)
        date.setDate(date.getDate() + 2);
        date = date.toISOString().substring(0, 10)
        var users = await mySQl.getSusers(date)
        res.status(200).send(users)
    })
}

async function getAlln(app) {
    app.post("/einteilungAnalytik/n", async (req, res) => {
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