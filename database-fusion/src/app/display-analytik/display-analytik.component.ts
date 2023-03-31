import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EinteilungAnalytikService } from '../services/einteilung-analytik.service';

@Component({
  selector: 'app-display-analytik',
  templateUrl: './display-analytik.component.html',
  styleUrls: ['./display-analytik.component.scss'],
})
export class DisplayAnalytikComponent implements OnInit {
  constructor(
    private router: Router,
    private app: AppComponent,
    private ein: EinteilungAnalytikService
  ) {
    /*if (this.app.login == false) {
      this.router.navigate(['login']);
    }*/
    this.app.display = true;
    this.getTableData();
    this.clock();
  }

  date: any;
  monkey: boolean = false;
  selectedIndex: number = 0;
  einteilungF: any;
  einteilungS: any;
  einteilungN: any;
  einteilungFS: any;
  einteilungSN: any;
  einteilungNF: any;
  früh: any;
  spät: any;
  nacht: any;
  on: boolean = false;
  date3: Date | any;
  clock() {
    setInterval(() => {
      const currentDate = new Date();
      this.date3 = currentDate.toLocaleTimeString();
    }, 1000);
  }

  update() {
    this.getTableData();
    var date2 = new Date();
    date2.setTime(date2.getTime() + 1 * 60 * 60 * 1000);
    var now = moment();
    var startF = moment('07:00', 'HH:mm');
    if (now.isBefore(startF)) {
      this.selectedIndex = 2;
      date2.setDate(date2.getDate() - 3);
    } else {
      date2.setDate(date2.getDate() - 2);
    }
    this.addEvent({ value: date2 });
    var newDate = date2;
    newDate.setDate(newDate.getDate() + 2);
    var dd = String(newDate.getDate()).padStart(2, '0');
    var mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = newDate.getFullYear();
    this.date = dd + '.' + mm + '.' + yyyy;
    this.getMaSettings();
  }

  //MaSettings:any
  //Groups:any
  Skills: any;
  Json: any = {
    good: [],
    ok: [],
    no: [],
  };
  async getMaSettings() {
    //this.MaSettings = await new Promise((resolve) => {
    //  this.ein.getMaSettings().subscribe(async (data: any) => {
    //    resolve(await data);
    //  });
    //}).catch(() => {
    //  console.log('could not get Pool MA Settings! ');
    //});
    //this.Groups = await new Promise((resolve) => {
    //  this.ein.getGroups().subscribe(async (data: any) => {
    //    resolve(await data);
    //  });
    //}).catch(() => {
    //  console.log('could not get Pool Groups! ');
    //});
    this.Skills = await new Promise((resolve) => {
      this.ein.getSkills().subscribe(async (data: any) => {
        resolve(await data);
      });
    }).catch(() => {
      console.log('could not get Pool Skills! ');
    });
    //this.Groups.text.shift();
    this.formateSkills();
  }

  formateSkills() {
    this.Json = {
      good: [],
      ok: [],
      no: [],
    };
    this.Skills = this.Skills.text;
    for (var i = 0; i < this.Skills[0].length; i++) {
      if (typeof this.Skills[0][i] == 'undefined') {
        continue;
      }
      var name = this.Skills[0][i].name;
      if (this.Skills[0][i].good == 'Einschulung') {
        this.Json.good.push(name);
      }
    }
    for (var i = 0; i < this.Skills[1].length; i++) {
      if (typeof this.Skills[1][i] == 'undefined') {
        continue;
      }
      var name = this.Skills[1][i].name;
      if (this.Skills[1][i].ok == 'Einschulung') {
        this.Json.ok.push(name);
      }
    }
    for (var i = 0; i < this.Skills[2].length; i++) {
      if (typeof this.Skills[2][i] == 'undefined') {
        continue;
      }
      var name = this.Skills[2][i].name;
      if (this.Skills[2][i].no == 'Einschulung') {
        this.Json.no.push(name);
      }
    }
  }

  async getTableData() {
    await this.app.getRolesAnal();
    var Json = this.app.roles;
    this.app.einteilungF = [];
    this.app.einteilungS = [];
    this.app.einteilungN = [];
    for (let i = 0; i < Json.length; i++) {
      if (Json[i].type == 'f') {
        this.app.einteilungF.push({
          id: Json[i].role + 'f',
          list: [],
          display: false,
          rename: false,
          color: Json[i].color,
        });
      } else if (Json[i].type == 's') {
        this.app.einteilungS.push({
          id: Json[i].role + 's',
          list: [],
          display: false,
          rename: false,
          color: Json[i].color,
        });
      } else if (Json[i].type == 'n') {
        this.app.einteilungN.push({
          id: Json[i].role + 'n',
          list: [],
          display: false,
          rename: false,
          color: Json[i].color,
        });
      } else {
        alert('An Error occured!');
      }
    }
  }

  async createDisplayEin() {
    this.einteilungNF = JSON.parse(JSON.stringify(this.einteilungN));//without the slice it doesn't copy
    this.einteilungFS = JSON.parse(JSON.stringify(this.einteilungF));
    this.einteilungSN = JSON.parse(JSON.stringify(this.einteilungS));
    var now = moment();
    var startF = moment('07:00', 'HH:mm');
    var startS = moment('12:30', 'HH:mm');
    var startN = moment('21:15', 'HH:mm');
    var overlapFS = moment('17:30', 'HH:mm');
    var overlapSN = moment('23:00', 'HH:mm');
    var overlapNF = moment('07:45', 'HH:mm');
    if (now.isSameOrAfter(startF) && now.isBefore(overlapNF)) {
      this.over = 1
      this.reset = 0
      this.oldEin = this.einteilungN;
      this.update();
      this.selectedIndex = 0;
      for (var i = 0; i < this.einteilungF.length; i++) {
        var index = this.einteilungNF.findIndex(
          (x: { id: string }) =>
            x.id === this.einteilungF[i].id.slice(0, -1) + 'n'
        );
        if (this.einteilungF[i].id.includes('Krank')) {
          continue;
        } else if (index != -1) {
          this.einteilungNF[index].list = this.einteilungNF[index].list.concat(
            this.einteilungF[i].list
          );
        } else {
          this.einteilungNF.push(this.einteilungF[i]);
        }
      }
      return true
    }
    if (now.isSameOrAfter(startS) && now.isBefore(overlapFS)) {
     this.over = 1
     this.reset = 1
     this.update();
     this.selectedIndex = 1;
     for (var i = 0; i < this.einteilungS.length; i++) {
       var index = this.einteilungFS.findIndex(
         (x: { id: string }) =>
           x.id === this.einteilungS[i].id.slice(0, -1) + 'f'
       );
       if (this.einteilungS[i].id.includes('Krank')) {
         continue;
       } else if (index != -1) {
         this.einteilungFS[index].list = this.einteilungFS[index].list.concat(
           this.einteilungS[i].list
         );
       } else {
         this.einteilungFS.push(this.einteilungS[i]);
       }
     }
     this.einteilungFS
     return true
    }
    if (now.isSameOrAfter(startN) && now.isBefore(overlapSN)) {
      this.over = 1
      this.reset = 1
      this.update();
      this.selectedIndex = 2;
      for (var i = 0; i < this.einteilungN.length; i++) {
        var index = this.einteilungSN.findIndex(
          (x: { id: string }) =>
            x.id === this.einteilungN[i].id.slice(0, -1) + 's'
        );
        if (this.einteilungN[i].id.includes('Krank')) {
          continue;
        } else if (index != -1) {
          this.einteilungSN[index].list = this.einteilungSN[index].list.concat(
            this.einteilungN[i].list
          );
        } else {
          this.einteilungSN.push(this.einteilungN[i]);
        }
      }
      this.einteilungSN
      return true
    }
    this.over = 0
    return false
  }

  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  async addEvent(event: any) {
    for (var f = 0; f < this.app.einteilungF.length; f++) {
      this.app.einteilungF[f].list = [];
    }
    for (var s = 0; s < this.app.einteilungS.length; s++) {
      this.app.einteilungS[s].list = [];
    }
    for (var n = 0; n < this.app.einteilungN.length; n++) {
      this.app.einteilungN[n].list = [];
    }
    event.value.setDate(event.value.getDate());
    this.app.getEinAnal(event.value);
    await this.delay(250);
    if (this.selectedIndex == 0) {
      this.einteilungF = this.app.einteilungF.splice(
        4,
        this.app.einteilungF.length
      );
      this.einteilungS = this.app.einteilungS.splice(
        4,
        this.app.einteilungS.length
      );
      this.einteilungN = this.app.einteilungN.splice(
        4,
        this.app.einteilungN.length
      );
    } else {
      this.einteilungF = this.app.einteilungF.splice(
        4,
        this.app.einteilungF.length
      );
      this.einteilungS = this.app.einteilungS.splice(
        3,
        this.app.einteilungS.length
      );
      this.einteilungN = this.app.einteilungN.splice(
        3,
        this.app.einteilungN.length
      );
    }
    for (var f = 0; f < this.einteilungF.length; f++) {
      if (
        this.einteilungF[f].list.length == 0 ||
        (this.einteilungF[f].list.length == 1 &&
          this.einteilungF[f].list.includes(''))
      ) {
        this.einteilungF.splice(f, 1);
        f--;
      }
    }
    for (var s = 0; s < this.einteilungS.length; s++) {
      if (
        this.einteilungS[s].list.length == 0 ||
        (this.einteilungS[s].list.length == 1 &&
          this.einteilungS[s].list.includes(''))
      ) {
        this.einteilungS.splice(s, 1);
        s--;
      }
    }
    for (var n = 0; n < this.einteilungN.length; n++) {
      if (
        this.einteilungN[n].list.length == 0 ||
        (this.einteilungN[n].list.length == 1 &&
          this.einteilungN[n].list.includes(''))
      ) {
        this.einteilungN.splice(n, 1);
        n--;
      }
    }
    if (this.reset == 0 && this.oldEin.length > 0) {
      this.einteilungN = this.oldEin;
      this.reset++;
    }
  }
  reset = 0;
  count = 1;
  oldEin: any;
  over = 0
  rotate() {
    setInterval(async () => {
      if (this.router.url !== '/displayAnalytik') {
        return;
      }
      //before the Update should be the swap, because to save the  old Nightshift
      var now = moment();
      var startF = moment('07:00', 'HH:mm');
      var startS = moment('12:30', 'HH:mm');
      var startN = moment('21:15', 'HH:mm');
      var swapF = moment('07:15', 'HH:mm');
      var swapS = moment('17:30', 'HH:mm');
      var swapN = moment('21:30', 'HH:mm');
      await this.createDisplayEin();
      if(this.over == 1){
        return
      }
      this.reset = 1
      /*
      //swap for Frühschicht
      if (
        now.isSameOrAfter(startF) &&
        now.isBefore(startS) &&
        now.isSameOrBefore(swapF) &&
        this.count % 5 != 0
      ) {
        if (this.count == 1) {
          this.oldEin = this.einteilungN;
        }
        this.reset = 0;
        this.update();
        this.selectedIndex = 2;
        this.count++;
        return;
      } else if (
        now.isSameOrAfter(startF) &&
        now.isBefore(startS) &&
        now.isSameOrBefore(swapF) &&
        this.count % 5 == 0
      ) {
        this.reset = 0;
        this.update();
        this.selectedIndex = 0;
        this.count++;
        await this.delay(20000);
        return;
      }
      this.reset = 1;
      //swap for Spätschicht
      if (
        now.isSameOrAfter(startS) &&
        now.isBefore(startN) &&
        now.isSameOrBefore(swapS) &&
        this.count % 5 != 0
      ) {
        this.update();
        this.selectedIndex = 1;
        this.count++;
        return;
      } else if (
        now.isSameOrAfter(startS) &&
        now.isBefore(startN) &&
        now.isSameOrBefore(swapS) &&
        this.count % 5 == 0
      ) {
        this.update();
        this.selectedIndex = 0;
        this.count++;
        await this.delay(20000);
        return;
      }
      //swap for Nachtschicht
      if (
        now.isSameOrAfter(startN) &&
        now.isSameOrBefore(swapN) &&
        this.count % 5 != 0
      ) {
        this.update();
        this.selectedIndex = 2;
        this.count++;
        return;
      } else if (
        now.isSameOrAfter(startN) &&
        now.isSameOrBefore(swapN) &&
        this.count % 5 == 0
      ) {
        this.update();
        this.selectedIndex = 1;
        this.count++;
        await this.delay(20000);
        return;
      }*/
      this.update();
      this.count = 1;
      if (
        now.isSameOrAfter(startF) &&
        now.isBefore(startS) &&
        now.isAfter(swapF)
      ) {
        this.selectedIndex = 0;
      } else if (
        now.isSameOrAfter(startS) &&
        now.isBefore(startN) &&
        now.isAfter(swapS)
      ) {
        this.selectedIndex = 1;
      } else if (now.isAfter(swapN)) {
        this.selectedIndex = 2;
      }
    }, 5000);
  }

  ngOnInit(): void {
    this.update();
    this.rotate();
  }
}

window.addEventListener('beforeunload', function (e) {
  AppComponent.display = false;
});
