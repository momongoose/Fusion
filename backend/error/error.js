const db = require("../database/communication2");
let mySQl = new db.MySQLdb();

async function getNew(app) {
    app.get("/error/new", async (req, res) => {
        var news = await mySQl.getNewData();
        var list = []
        for(var i = 0; i < news.length; i++){
            var time = new Date(Date.parse(news[i].time.toString().replace(/-/g, '/')))
            if(news[i].event == "was not found for station JANUS"){
                list.push({name:"'" + news[i].sample + "' wurde nicht in " + news[i].janus + " gefunden!  " + formatDate(time), checked: false})
            } else if(news[i].event == "duplicate sample ID") {
                list.push({name:"Probe '" + news[i].sample + "' doppelt in " + news[i].janus + " gefunden!  " + formatDate(time), checked: false})
            } else {
                list.push({name:"Platte '" + news[i].sample + "' doppelt in " + news[i].janus + " gefunden!  " + formatDate(time), checked: false})
            }
        }
        await res.status(200).send(list);
    })
    return("ok")
}

async function getOld(app) {
    app.get("/error/old", async (req, res) => {
        var old = await mySQl.getOldData();
        var list = []
        for(var i = 0; i < old.length; i++){
            var time = new Date(Date.parse(old[i].time.toString().replace(/-/g, '/')))
            if(old[i].event == "was not found for station JANUS"){
                list.push({name:"'" + old[i].sample + "' wurde nicht in " + old[i].janus + " gefunden!  " + formatDate(time), checked: false})
            } else if(old[i].event == "duplicate sample ID") {
                list.push({name:"Probe '" + old[i].sample + "' doppelt in " + old[i].janus + " gefunden!  " + formatDate(time), checked: false})
            } else {
                list.push({name:"Platte '" + old[i].sample + "' doppelt in " + old[i].janus + " gefunden!  " + formatDate(time), checked: false})
            }
        }
        await res.status(200).send(list);
    })
    return("ok")
}

async function update(app) {
    app.post("/error/update", async (req, res) => {
        var update = req.body.sample
        await mySQl.updateData(update)
        res.status(200).send("OK")
    })
    return("ok")
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }


const data = {
    getNew,
    getOld,
    update
  };
  
  module.exports = data;