const db = require("../database/communication");
let mySQl = new db.MySQLdb();

async function getInfo(app) {
  app.get("/database/janus/info", async (req, res) => {

    var day = await mySQl.getDayText();
    var week = await mySQl.getWeekText();
    var twoweeks = await mySQl.getTwoWeeksText();
    var month = await mySQl.getMonthText();

    JanusErrorDay = {}
    JanusErrorWeek = {}
    JanusErrorTwoWeeks = {}
    JanusErrorMonth={}

    for(var i = 0; i < day.length; i++){
        if(day[i].janus in JanusErrorDay){
            JanusErrorDay[day[i].janus].push(day[i])
        } else {
            JanusErrorDay[day[i].janus] = []
            JanusErrorDay[day[i].janus].push(day[i])
        }
    }

    for(var i = 0; i < week.length; i++){
        if(week[i].janus in JanusErrorWeek){
            JanusErrorWeek[week[i].janus].push(week[i])
        } else {
            JanusErrorWeek[week[i].janus] = []
            JanusErrorWeek[week[i].janus].push(week[i])
        }
    }

    for(var i = 0; i < twoweeks.length; i++){
        if(twoweeks[i].janus in JanusErrorTwoWeeks){
            JanusErrorTwoWeeks[twoweeks[i].janus].push(twoweeks[i])
        } else {
            JanusErrorTwoWeeks[twoweeks[i].janus] = []
            JanusErrorTwoWeeks[twoweeks[i].janus].push(twoweeks[i])
        }
    }

    for(var i = 0; i < month.length; i++){
        if(month[i].janus in JanusErrorMonth){
            JanusErrorMonth[month[i].janus].push(month[i])
            /*splitting errors
            if(month[i].Errorcode in JanusErrorDay[month[i].janus]){
                JanusErrorDay[month[i].janus][month[i].Errorcode].push({date:month[i].Date, count:month[i].Anzahl, movements:month[i].Movements, errortext:month[i].Errortext})
            } else {
                JanusErrorDay[month[i].janus][month[i].Errorcode] = []
                JanusErrorDay[month[i].janus][month[i].Errorcode].push({date:month[i].Date, count:month[i].Anzahl, movements:month[i].Movements, errortext:month[i].Errortext})
            }*/
        } else {
            JanusErrorMonth[month[i].janus] = []
            JanusErrorMonth[month[i].janus].push(month[i])
            /*JanusErrorDay[month[i].janus] = {}
            if(month[i].Errorcode in JanusErrorDay[month[i].janus]){
                JanusErrorDay[month[i].janus][month[i].Errorcode].push({date:month[i].Date, count:month[i].Anzahl, movements:month[i].Movements, errortext:month[i].Errortext})
            } else {
                JanusErrorDay[month[i].janus][month[i].Errorcode] = []
                JanusErrorDay[month[i].janus][month[i].Errorcode].push({date:month[i].Date, count:month[i].Anzahl, movements:month[i].Movements, errortext:month[i].Errortext})
            }*/
        }
    }

    var Schema = {
        day: JanusErrorDay,
        week: JanusErrorWeek,
        two_weeks: JanusErrorTwoWeeks,
        month: JanusErrorMonth,
      };
      //console.log(Schema)
      await res.status(200).send(Schema);
  })
  return("ok")
}

module.exports = getInfo;