const db = require("../database/communication");
let mySQl = new db.MySQLdb();

async function getAll(app) {
  app.get("/database/janus", async (req, res) => {
    var day = await mySQl.getDay();
    var week = await mySQl.getWeek();
    var twoweeks = await mySQl.getTwoWeeks();
    var month = await mySQl.getMonth();
    var ErrorlistDay = [];
    var ErrorJsonDay = {};
    var ErrorSumDay = {};
    for (var i = 0; i < day.length; i++) {
      ErrorlistDay.push(day[i].Errorcode);
      ErrorJsonDay[day[i].Errorcode] = [];
    }
    var ErrorlistWeek = [];
    var ErrorJsonWeek = {};
    var ErrorSumWeek = {};
    for (var i = 0; i < week.length; i++) {
      ErrorlistWeek.push(week[i].Errorcode);
      ErrorJsonWeek[week[i].Errorcode] = [];
    }
    var ErrorlistTwoWeeks = [];
    var ErrorJsonTwoWeeks = {};
    var ErrorSumTwoWeeks = {};
    for (var i = 0; i < twoweeks.length; i++) {
      ErrorlistTwoWeeks.push(twoweeks[i].Errorcode);
      ErrorJsonTwoWeeks[twoweeks[i].Errorcode] = [];
    }
    var ErrorlistMonth = [];
    var ErrorJsonMonth = {};
    var ErrorSumMonth = {};
    for (var i = 0; i < month.length; i++) {
      ErrorlistMonth.push(month[i].Errorcode);
      ErrorJsonMonth[month[i].Errorcode] = [];
    }
    for (var i = 0; i < day.length; i++) {
      var code = String(day[i].Errorcode);
      var janus = {};
      janus[day[i].janus] = [[day[i].Anzahl, day[i].Movements, day[i].Date]];
      ErrorJsonDay[code].push(janus);
      if(code == "0"){
        continue;
      }
      if(ErrorSumDay.hasOwnProperty(day[i].janus)){
        ErrorSumDay[day[i].janus][0] += day[i].Anzahl
      } else {
        ErrorSumDay[day[i].janus] = [0 , 0]
        ErrorSumDay[day[i].janus][0] += day[i].Anzahl
        ErrorSumDay[day[i].janus][1] += day[i].Movements
      }
    }
    ErrorJsonDay["all"] = (ErrorSumDay);
    for (var i = 0; i < week.length; i++) {
      var code = String(week[i].Errorcode);
      var janus = {};
      janus[week[i].janus] = [
        [week[i].Anzahl, week[i].Movements, week[i].Date],
      ];
      ErrorJsonWeek[code].push(janus);
      if(code == "0"){
        continue;
      }
      if(ErrorSumWeek.hasOwnProperty(week[i].janus)){
        ErrorSumWeek[week[i].janus][0] += week[i].Anzahl
      } else {
        ErrorSumWeek[week[i].janus] = [0 , 0]
        ErrorSumWeek[week[i].janus][0] += week[i].Anzahl
        ErrorSumWeek[week[i].janus][1] += week[i].Movements
      }
    }
    ErrorJsonWeek["all"] = (ErrorSumWeek);
    for (var i = 0; i < twoweeks.length; i++) {
      var code = String(twoweeks[i].Errorcode);
      var janus = {};
      janus[twoweeks[i].janus] = [
        [twoweeks[i].Anzahl, twoweeks[i].Movements, twoweeks[i].Date],
      ];
      ErrorJsonTwoWeeks[code].push(janus);
      if(code == "0"){
        continue;
      }
      if(ErrorSumTwoWeeks.hasOwnProperty(twoweeks[i].janus)){
        ErrorSumTwoWeeks[twoweeks[i].janus][0] += twoweeks[i].Anzahl
      } else {
        ErrorSumTwoWeeks[twoweeks[i].janus] = [0 , 0]
        ErrorSumTwoWeeks[twoweeks[i].janus][0] += twoweeks[i].Anzahl
        ErrorSumTwoWeeks[twoweeks[i].janus][1] += twoweeks[i].Movements
      }
    }
    ErrorJsonTwoWeeks["all"] = (ErrorSumTwoWeeks);
    for (var i = 0; i < month.length; i++) {
      var code = String(month[i].Errorcode);
      var janus = {};
      janus[month[i].janus] = [
        [month[i].Anzahl, month[i].Movements, month[i].Date],
      ];
      ErrorJsonMonth[code].push(janus);
      if(code == "0"){
        continue;
      }
      if(ErrorSumMonth.hasOwnProperty(month[i].janus)){
        ErrorSumMonth[month[i].janus][0] += month[i].Anzahl
      } else {
        ErrorSumMonth[month[i].janus] = [0 , 0]
        ErrorSumMonth[month[i].janus][0] += month[i].Anzahl
        ErrorSumMonth[month[i].janus][1] += month[i].Movements
      }
    }
    ErrorJsonMonth["all"] = (ErrorSumMonth);
    /*Code for diffrent Database
    var ErrorlistDay = [];
    var ErrorJsonDay = {};
    for (var i = 0; i < day.length; i++) {
      if (ErrorlistDay.includes(day[i].Errorcode) == false) {
        ErrorlistDay.push(day[i].Errorcode);
        ErrorJsonDay[day[i].Errorcode] = [];
      }
    }
    var ErrorlistWeek = [];
    var ErrorJsonWeek = {};
    for (var i = 0; i < week.length; i++) {
      if (ErrorlistWeek.includes(week[i].Errorcode) == false) {
        ErrorlistWeek.push(week[i].Errorcode);
        ErrorJsonWeek[week[i].Errorcode] = [];
      }
    }
    var ErrorlistTwoWeeks = [];
    var ErrorJsonTwoWeeks = {};
    for (var i = 0; i < twoweeks.length; i++) {
      if (ErrorlistTwoWeeks.includes(twoweeks[i].Errorcode) == false) {
        ErrorlistTwoWeeks.push(twoweeks[i].Errorcode);
        ErrorJsonTwoWeeks[twoweeks[i].Errorcode] = [];
      }
    }
    var ErrorlistMonth = [];
    var ErrorJsonMonth = {};
    for (var i = 0; i < month.length; i++) {
      if (ErrorlistMonth.includes(month[i].Errorcode) == false) {
        ErrorlistMonth.push(month[i].Errorcode);
        ErrorJsonMonth[month[i].Errorcode] = [];
      }
    }
    for (var i = 0; i < day.length; i++) {
        var code = String(day[i].Errorcode);
        if (JSON.stringify(ErrorJsonDay[code]).includes(day[i].janus)) {
            ErrorJsonDay[code][0][day[i].janus].push([
            day[i].Anzahl,
            day[i].Movements,
            day[i].Date,
            day[i].Errortext,
          ]);
        } else {
          var janus = {};
          janus[day[i].janus] = [
            [day[i].Anzahl, day[i].Movements, day[i].Date, day[i].Errortext],
          ];
          ErrorJsonDay[code].push(janus);
        }
    }
    for (var i = 0; i < week.length; i++) {
        var code = String(week[i].Errorcode);
        if (JSON.stringify(ErrorJsonWeek[code]).includes(week[i].janus)) {
            ErrorJsonWeek[code][0][week[i].janus].push([
            week[i].Anzahl,
            week[i].Movements,
            week[i].Date,
            week[i].Errortext,
          ]);
        } else {
          var janus = {};
          janus[week[i].janus] = [
            [week[i].Anzahl, week[i].Movements, week[i].Date, week[i].Errortext],
          ];
          ErrorJsonWeek[code].push(janus);
        }
    }
    for (var i = 0; i < twoweeks.length; i++) {
        var code = String(twoweeks[i].Errorcode);
        if (JSON.stringify(ErrorJsonTwoWeeks[code]).includes(twoweeks[i].janus)) {
            ErrorJsonTwoWeeks[code][0][twoweeks[i].janus].push([
            twoweeks[i].Anzahl,
            twoweeks[i].Movements,
            twoweeks[i].Date,
            twoweeks[i].Errortext,
          ]);
        } else {
          var janus = {};
          janus[twoweeks[i].janus] = [
            [twoweeks[i].Anzahl, twoweeks[i].Movements, twoweeks[i].Date, twoweeks[i].Errortext],
          ];
          ErrorJsonTwoWeeks[code].push(janus);
        }
    }
    for (var i = 0; i < month.length; i++) { 
      var code = String(month[i].Errorcode);
      if (JSON.stringify(ErrorJsonMonth[code]).includes(month[i].janus)) {
        ErrorJsonMonth[code][0][month[i].janus].push([
            month[i].Anzahl,
            month[i].Movements,
            month[i].Date,
            month[i].Errortext,
        ]);
      } else {
        var janus = {};
        janus[month[i].janus] = [
          [month[i].Anzahl, month[i].Movements, month[i].Date, month[i].Errortext],
        ];
        ErrorJsonMonth[code].push(janus);
      }
    }*/
    var Schema = {
      day: ErrorJsonDay,
      week: ErrorJsonWeek,
      two_weeks: ErrorJsonTwoWeeks,
      month: ErrorJsonMonth,
    };
    //console.log(Schema)
    await res.status(200).send(Schema);
  });
}

module.exports = getAll;
