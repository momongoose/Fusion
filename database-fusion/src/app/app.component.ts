import { Component, OnInit } from '@angular/core';
import { ErrorService } from './services/error.service';
import { EinteilungService } from './services/einteilung.service';
import { EinteilungAnalytikService } from './services/einteilung-analytik.service';
import { EinteilungPraeService } from './services/einteilung-prae.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  static display: any;
  constructor(
    private error: ErrorService,
    private ein: EinteilungService,
    private einAnalytik: EinteilungAnalytikService,
    private einPrae: EinteilungPraeService
  ) {
    this.display = false;
  }
  title = 'database-fusion';
  login: any;
  data: any = false;
  data2: any = false;
  all: any;
  old: any;
  früh: any;
  spät: any;
  nacht: any;
  roles: any;
  connectedToF: any;
  connectedToS: any;
  connectedToN: any;
  settingsPooling: any;
  settingsAnalytik: any;
  settingsPräanalytik: any;
  commentF: any;
  commentS: any;
  commentN: any;
  einteilung: any;
  date: any;
  exist: any = false;
  display: boolean = false;
  breakTime = [];
  halfHour = 30 * 60 * 1000;
  MaSettingsPooling: any;
  //Variable for the Groups and Skills
  PoolingGroups: any;
  PoolingSkills: any;
  MaSettingsAnalytik: any;
  //Variable for the Groups and Skills
  AnalytikGroups: any;
  AnalytikSkills: any;
  AnalytikWish:any;
  AnalytikWishArray:any = []
  MaSettingsPrae: any;
  //Variable for the Groups and Skills
  PraeGroups: any;
  PraeSkills: any;
  Json: any = [];
  //Variable for Stats
  Stats: any = [];
  einteilungF: any = [
    {
      id: 'Mitarbeiterf',
      list: [],
    },
  ];
  einteilungS: any = [
    {
      id: 'Mitarbeiters',
      list: [],
    },
  ];
  einteilungN: any = [
    {
      id: 'Mitarbeitern',
      list: [],
    },
  ];
  async getStats() {
    this.Stats = await new Promise((resolve) => {
      this.ein.getStats().subscribe(async (data: any) => {
        resolve(await data);
      });
    }).catch(() => {
      console.log('could not delete old Data! ');
    });
  }
  async getStatsAnal() {
    this.Stats = await new Promise((resolve) => {
      this.einAnalytik.getStats().subscribe(async (data: any) => {
        resolve(await data);
      });
    }).catch(() => {
      console.log('could not delete old Data! ');
    });
  }
  async getStatsPrae() {
    this.Stats = await new Promise((resolve) => {
      this.einPrae.getStats().subscribe(async (data: any) => {
        resolve(await data);
      });
    }).catch(() => {
      console.log('could not delete old Data! ');
    });
  }
  formatGroupPeople() {
    if (typeof this.PoolingGroups == 'undefined' ) {
      return;
    }
    var group = this.PoolingGroups.text;
    var skills = this.PoolingSkills.text;
    for (var i = 0; i < group.length; i++) {
      this.Json[group[i].name] = { good: [], ok: [], no: [], wish: [] };
    }
    for (var i = 0; i < skills[0].length; i++) {
      if (typeof skills[0][i].role != 'undefined' && typeof skills[0][i].good != 'undefined' && skills[0][i].role != null && skills[0][i].good != null) {
        var name = skills[0][i].name;
        var skill = skills[0][i].good;
        this.Json[skill].good.push(name);
        if (skills[0][i].role != '' && typeof this.Json[skill] != 'undefined') {
          this.Json[skill].wish.push(name + '|' + skills[0][i].role);
        }
      }
    }
    for (var i = 0; i < skills[1].length; i++) {
      if (typeof skills[1][i].role != 'undefined' && typeof skills[1][i].ok != 'undefined' && skills[1][i].role != null && skills[1][i].ok != null) {
        var name = skills[1][i].name;
        var skill = skills[1][i].ok;
        this.Json[skill].ok.push(name);
        if (skills[1][i].role != '' && typeof this.Json[skill] != 'undefined') {
          this.Json[skill].wish.push(name + '|' + skills[1][i].role);
        }
      }
    }
    for (var i = 0; i < skills[2].length; i++) {
      if (typeof skills[2][i].role != 'undefined' && typeof skills[2][i].no != 'undefined' && skills[2][i].role != null && skills[2][i].no != null) {
        var name = skills[2][i].name;
        var skill = skills[2][i].no;
        this.Json[skill].no.push(name);
        if (skills[2][i].role != '' && typeof this.Json[skill] != 'undefined') {
          this.Json[skill].wish.push(name + '|' + skills[2][i].role);
        }
      }
    }
    /* this Part of the code is not functional
    for (var i = 0; i < skills[3].length; i++) {
      if (typeof skills[3][i].role != 'undefined' && skills[3][i].role != null) {
        var name = skills[3][i].name;
        if (skills[3][i].role != '') {
          this.Json[skill].wish.push(name + '|' + skills[3][i].role);
        }
      }
    }*/

  }
  formatGroupPeopleAnal() {
    if(typeof this.AnalytikGroups == 'undefined' || typeof this.AnalytikSkills == 'undefined' ){
      return
    }
    var group = this.AnalytikGroups.text
    var skills = this.AnalytikSkills.text
    for(var i = 0; i < group.length; i++){
      if(group[i].name.includes(')')){
        this.Json[group[i].name.charAt(group[i].name.indexOf(')') - 1)] = {good:[], ok:[], no:[], wish:[]}
      } else{
        this.Json[group[i].name] = {good:[], ok:[], no:[], wish:[]}
      }
    }
    for (var i = 0; i < skills[0].length; i++) {
      if (typeof skills[0][i].role != 'undefined' && typeof skills[0][i].good != 'undefined' && skills[0][i].role != null && skills[0][i].good != null) {
        var name = skills[0][i].name;
        var skill = skills[0][i].good;
        if(skill.includes(')')){
          skill = skill.charAt(skill.indexOf(')') - 1)
        }
        this.Json[skill].good.push(name);
        if(skills[0][i].role != '' && typeof this.Json[skill] != 'undefined' && skills[0][i].role.includes(')')){
          this.Json[skill].wish.push(name + '|' + skills[0][i].role.charAt(skills[0][i].role.indexOf(')') - 1));
        }else if (skills[0][i].role != '' && typeof this.Json[skill] != 'undefined') {
          this.Json[skill].wish.push(name + '|' + skills[0][i].role);
        }
      }
    }
    for (var i = 0; i < skills[1].length; i++) {
      if (typeof skills[1][i].role != 'undefined' && typeof skills[1][i].ok != 'undefined' && skills[1][i].role != null && skills[1][i].ok != null) {
        var name = skills[1][i].name;
        var skill = skills[1][i].ok;
        if(skill.includes(')')){
          skill = skill.charAt(skill.indexOf(')') - 1)
        }
        this.Json[skill].ok.push(name);
        if(skills[1][i].role != '' && typeof this.Json[skill] != 'undefined' && skills[1][i].role.includes(')')){
          this.Json[skill].wish.push(name + '|' + skills[1][i].role.charAt(skills[1][i].role.indexOf(')') - 1));
        }else if (skills[1][i].role != '' && typeof this.Json[skill] != 'undefined') {
          this.Json[skill].wish.push(name + '|' + skills[1][i].role);
        }
      }
    }
    for (var i = 0; i < skills[2].length; i++) {
      if (typeof skills[2][i].role != 'undefined' && typeof skills[2][i].no != 'undefined' && skills[2][i].role != null && skills[2][i].no != null) {
        var name = skills[2][i].name;
        var skill = skills[2][i].no;
        if(skill.includes(')')){
          skill = skill.charAt(skill.indexOf(')') - 1)
        }
        this.Json[skill].no.push(name);
        if(skills[2][i].role != '' && typeof this.Json[skill] != 'undefined' && skills[2][i].role.includes(')')){
          this.Json[skill].wish.push(name + '|' + skills[2][i].role.charAt(skills[2][i].role.indexOf(')') - 1));
        }else if (skills[2][i].role != '' && typeof this.Json[skill] != 'undefined') {
          this.Json[skill].wish.push(name + '|' + skills[2][i].role);
        }
      }
    }

    for (var i = 0; i < skills[3].length; i++) {
      if (typeof skills[3][i].role != 'undefined' && skills[3][i].role != null) {
        var name = skills[3][i].name;
        if(skill.includes(')')){
          skill = skill.charAt(skill.indexOf(')') - 1)
        }
        if (skills[3][i].role != '' && skills[3][i].role.includes(')')) {
          this.Json[skill].wish.push(name + '|' + skills[3][i].role.charAt(skills[3][i].role.indexOf(')') - 1));
        } else if (skills[3][i].role != '') {
          this.Json[skill].wish.push(name + '|' + skills[3][i].role);
        }
      }
    }
  }
  formatGroupPeoplePrae() {
    if (typeof this.PraeGroups == 'undefined') {
      return;
    }
    var group = this.PraeGroups.text;
    var skills = this.PraeSkills.text;
    for (var i = 0; i < group.length; i++) {
      this.Json[group[i].name] = { good: [], ok: [], no: [], wish: [] };
    }
    for (var i = 0; i < skills[0].length; i++) {
      if (typeof skills[0][i].role != 'undefined' && typeof skills[0][i].good != 'undefined' && skills[0][i].role != null && skills[0][i].good != null) {
        var name = skills[0][i].name;
        var skill = skills[0][i].good;
        this.Json[skill].good.push(name);
        if (skills[0][i].role != '' && typeof this.Json[skill] != 'undefined') {
          this.Json[skill].wish.push(name + '|' + skills[0][i].role);
        }
      }
    }
    for (var i = 0; i < skills[1].length; i++) {
      if (typeof skills[1][i].role != 'undefined' && typeof skills[1][i].ok != 'undefined' && skills[1][i].role != null && skills[1][i].ok != null) {
        var name = skills[1][i].name;
        var skill = skills[1][i].ok;
        this.Json[skill].ok.push(name);
        if (skills[1][i].role != '' && typeof this.Json[skill] != 'undefined') {
          this.Json[skill].wish.push(name + '|' + skills[1][i].role);
        }
      }
    }
    for (var i = 0; i < skills[2].length; i++) {
      if (typeof skills[2][i].role != 'undefined' && typeof skills[2][i].no != 'undefined' && skills[2][i].role != null && skills[2][i].no != null) {
        var name = skills[2][i].name;
        var skill = skills[2][i].no;
        this.Json[skill].no.push(name);
        if (skills[2][i].role != '' && typeof this.Json[skill] != 'undefined') {
          this.Json[skill].wish.push(name + '|' + skills[2][i].role);
        }
      }
    }
    /*
    for (var i = 0; i < skills[3].length; i++) {
      if (typeof skills[3][i].role != 'undefined' && skills[3][i].role != null) {
        var name = skills[3][i].name;
        if (skills[3][i].role != '') {
          this.Json[skill].wish.push(name + '|' + skills[3][i].role);
        }
      }
    }*/
  }
  async getSettings(setting: any) {
    switch (this.login) {
      case 3:
        this.ein.getSet(setting, 'pooling').subscribe(async (data) => {
          this.settingsPooling = await data.text;
        });
        break;
      case 8:
      case 4:
        this.einAnalytik.getSet(setting, 'analytik').subscribe(async (data) => {
          this.settingsAnalytik = await data.text;
        });
        break;
      case 5:
        this.einPrae.getSet(setting, 'präanalytik').subscribe(async (data) => {
          this.settingsPräanalytik = await data.text;
        });
        break;
      default:
        return;
    }
  }
  async getMaSettings() {
    switch (this.login) {
      case 3:
        this.MaSettingsPooling = await new Promise((resolve) => {
          this.ein.getMaSettings().subscribe(async (data: any) => {
            resolve(await data);
          });
        }).catch(() => {
          console.log('could not get Pool MA Settings! ');
        });
        this.PoolingGroups = await new Promise((resolve) => {
          this.ein.getGroups().subscribe(async (data: any) => {
            resolve(await data);
          });
        }).catch(() => {
          console.log('could not get Pool Groups! ');
        });
        this.PoolingSkills = await new Promise((resolve) => {
          this.ein.getSkills().subscribe(async (data: any) => {
            resolve(await data);
          });
        }).catch(() => {
          console.log('could not get Pool Skills! ');
        });
        this.PoolingGroups.text.shift();
        this.formatGroupPeople();
        break;
      case 8:
      case 4:
        this.MaSettingsAnalytik = await new Promise((resolve) => {
          this.einAnalytik.getMaSettings().subscribe(async (data: any) => {
            resolve(await data);
          });
        }).catch(() => {
          console.log('could not get Analytik MA Settings! ');
        });
        this.AnalytikGroups = await new Promise((resolve) => {
          this.einAnalytik.getGroups().subscribe(async (data: any) => {
            resolve(await data);
          });
        }).catch(() => {
          console.log('could not get Analytik Groups! ');
        });
        this.AnalytikSkills = await new Promise((resolve) => {
          this.einAnalytik.getSkills().subscribe(async (data: any) => {
            resolve(await data);
          });
        }).catch(() => {
          console.log('could not get Analytik Skills! ');
        });
        this.AnalytikWish = await new Promise((resolve) => {
          this.einAnalytik.getWish().subscribe(async (data: any) => {
            resolve(await data);
          });
        }).catch(() => {
          console.log('could not get Analytik Wish! ');
        });
        this.AnalytikGroups.text.shift();
        this.formatGroupPeopleAnal();
        break;
      case 5:
        this.MaSettingsPrae = await new Promise((resolve) => {
          this.einPrae.getMaSettings().subscribe(async (data: any) => {
            resolve(await data);
          });
        }).catch(() => {
          console.log('could not get Prae MA Settings! ');
        });
        this.PraeGroups = await new Promise((resolve) => {
          this.einPrae.getGroups().subscribe(async (data: any) => {
            resolve(await data);
          });
        }).catch(() => {
          console.log('could not get Prae Groups! ');
        });
        this.PraeSkills = await new Promise((resolve) => {
          this.einPrae.getSkills().subscribe(async (data: any) => {
            resolve(await data);
          });
        }).catch(() => {
          console.log('could not get Prae Skills! ');
        });
        this.PraeGroups.text.shift();
        this.formatGroupPeoplePrae();
        break;
    }
  }
  getData() {
    this.error.get_new().subscribe(async (data: any) => {
      this.all = JSON.parse(await data);
    });
    this.error.get_old().subscribe(async (data: any) => {
      this.old = JSON.parse(await data);
    });
  }

  async getRoles() {
    this.roles = await new Promise((resolve) => {
      this.ein.getRoles().subscribe(async (data: any) => {
        resolve(await data);
      });
    }).catch(() => {
      console.log('could not delete old Data! ');
    });
  }

  async getRolesAnal() {
    this.roles = await new Promise((resolve) => {
      this.einAnalytik.getRoles().subscribe(async (data: any) => {
        resolve(await data);
      });
    }).catch(() => {
      console.log('could not delete old Data! ');
    });
  }

  async getRolesPrae() {
    this.roles = await new Promise((resolve) => {
      this.einPrae.getRoles().subscribe(async (data: any) => {
        resolve(await data);
      });
    }).catch(() => {
      console.log('could not delete old Data! ');
    });
  }

  connectListsF(einteilung: any) {
    this.connectedToF = [];
    for (let position of einteilung) {
      this.connectedToF.push(position.id);
    }
    this.connectedToF = [...this.connectedToF];
  }

  connectListsS(einteilung: any) {
    this.connectedToS = [];
    for (let position of einteilung) {
      this.connectedToS.push(position.id);
    }
    this.connectedToS = [...this.connectedToS];
  }

  connectListsN(einteilung: any) {
    this.connectedToN = [];
    for (let position of einteilung) {
      this.connectedToN.push(position.id);
    }
    this.connectedToN = [...this.connectedToN];
  }

  async getEinAnalytik(date: any) {
    this.einAnalytik.getEinteilung(date).subscribe(async (data) => {
      this.exist = data.exist;
      this.einteilung = data.text;
      if (this.exist == false) {
        this.früh = [];
        this.spät = [];
        this.nacht = [];
        this.einAnalytik.getF(date).subscribe(async (data) => {
          this.früh = await data;
        });
        this.einAnalytik.getS(date).subscribe(async (data) => {
          this.spät = await data;
        });
        this.einAnalytik.getN(date).subscribe(async (data) => {
          this.nacht = await data;
        });
      } else {
        this.früh = [];
        this.spät = [];
        this.nacht = [];
        for (var f = 0; f < this.einteilungF.length; f++) {
          this.einteilungF[f].list = [];
          this.einteilungF[f]['display'] = false;
          this.einteilungF[f]['rename'] = false;
        }
        for (var s = 0; s < this.einteilungS.length; s++) {
          this.einteilungS[s].list = [];
          this.einteilungS[s]['display'] = false;
          this.einteilungS[s]['rename'] = false;
        }
        for (var n = 0; n < this.einteilungN.length; n++) {
          this.einteilungN[n].list = [];
          this.einteilungN[n]['display'] = false;
          this.einteilungN[n]['rename'] = false;
        }
        var countf = 0;
        var counts = 0;
        var countn = 0;
        for (var i = 0; i < this.einteilung.length; i++) {
          if (this.einteilung[i].type == 'f') {
            countf++;
            for (var j = 0; j < this.einteilungF.length; j++) {
              if (
                this.einteilungF[j].id ==
                this.einteilung[i].role + this.einteilung[i].type
              ) {
                var Dat = new Date(this.einteilung[i].date);
                var TimeArray = this.einteilung[i].break.split(':');
                var HalfHour =
                  Dat.setHours(TimeArray[0], TimeArray[1], TimeArray[2], 0) +
                  this.halfHour;
                if (
                  new Date().getTime() > HalfHour &&
                  this.einteilung[i].break !== '66:00:00'
                ) {
                  this.einAnalytik
                    .updateBreak(
                      this.einteilung[i].name,
                      this.einteilung[i].date,
                      '66:00:00'
                    )
                    .subscribe(async (data) => {
                      return data;
                    });
                } else if (
                  new Date().getTime() < HalfHour &&
                  new Date().getTime() > HalfHour - this.halfHour
                ) {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungF[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: true,
                    time: this.einteilung[i].break,
                  });
                  continue;
                } else {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungF[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: false,
                    time: this.einteilung[i].break,
                  });
                  continue;
                }
                if (this.einteilung[i].break == '66:00:00') {
                  this.einteilung[i].break = '';
                } else {
                  this.einteilung[i].break = this.einteilung[i].break.substring(
                    0,
                    5
                  );
                }
                this.einteilungF[j].list.push({
                  name: this.einteilung[i].name,
                  state: this.einteilung[i].comment,
                  break: false,
                  time: this.einteilung[i].break,
                });
              }
            }
          } else if (this.einteilung[i].type == 's') {
            counts++;
            for (var j = 0; j < this.einteilungS.length; j++) {
              if (
                this.einteilungS[j].id ==
                this.einteilung[i].role + this.einteilung[i].type
              ) {
                var Dat = new Date(this.einteilung[i].date);
                var TimeArray = this.einteilung[i].break.split(':');
                var HalfHour =
                  Dat.setHours(TimeArray[0], TimeArray[1], TimeArray[2], 0) +
                  this.halfHour;
                if (
                  new Date().getTime() > HalfHour &&
                  this.einteilung[i].break !== '66:00:00'
                ) {
                  this.einAnalytik
                    .updateBreak(
                      this.einteilung[i].name,
                      this.einteilung[i].date,
                      '66:00:00'
                    )
                    .subscribe(async (data) => {
                      return data;
                    });
                } else if (
                  new Date().getTime() < HalfHour &&
                  new Date().getTime() > HalfHour - this.halfHour
                ) {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungS[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: true,
                    time: this.einteilung[i].break,
                  });
                  continue;
                } else {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungS[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: false,
                    time: this.einteilung[i].break,
                  });
                  continue;
                }
                if (this.einteilung[i].break == '66:00:00') {
                  this.einteilung[i].break = '';
                } else {
                  this.einteilung[i].break = this.einteilung[i].break.substring(
                    0,
                    5
                  );
                }
                this.einteilungS[j].list.push({
                  name: this.einteilung[i].name,
                  state: this.einteilung[i].comment,
                  break: false,
                  time: this.einteilung[i].break,
                });
              }
            }
          } else if (this.einteilung[i].type == 'n') {
            countn++;
            for (var j = 0; j < this.einteilungN.length; j++) {
              if (
                this.einteilungN[j].id ==
                this.einteilung[i].role + this.einteilung[i].type
              ) {
                var Dat = new Date(this.einteilung[i].date);
                var TimeArray = this.einteilung[i].break.split(':');
                var HalfHour =
                  Dat.setHours(TimeArray[0], TimeArray[1], TimeArray[2], 0) +
                  this.halfHour;
                if (
                  new Date().getTime() > HalfHour &&
                  this.einteilung[i].break !== '66:00:00'
                ) {
                  this.einAnalytik
                    .updateBreak(
                      this.einteilung[i].name,
                      this.einteilung[i].date,
                      '66:00:00'
                    )
                    .subscribe(async (data) => {
                      return data;
                    });
                } else if (
                  new Date().getTime() < HalfHour &&
                  new Date().getTime() > HalfHour - this.halfHour
                ) {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungN[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: true,
                    time: this.einteilung[i].break,
                  });
                  continue;
                } else {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungN[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: false,
                    time: this.einteilung[i].break,
                  });
                  continue;
                }
                if (this.einteilung[i].break == '66:00:00') {
                  this.einteilung[i].break = '';
                } else {
                  this.einteilung[i].break = this.einteilung[i].break.substring(
                    0,
                    5
                  );
                }
                this.einteilungN[j].list.push({
                  name: this.einteilung[i].name,
                  state: this.einteilung[i].comment,
                  break: false,
                  time: this.einteilung[i].break,
                });
              }
            }
          }
        }
        if (countf == 0) {
          this.einAnalytik.getF(date).subscribe(async (data) => {
            this.früh = await data;
          });
        }
        if (counts == 0) {
          this.einAnalytik.getS(date).subscribe(async (data) => {
            this.spät = await data;
          });
        }
        if (countn == 0) {
          this.einAnalytik.getN(date).subscribe(async (data) => {
            this.nacht = await data;
          });
        }
      }
    });
  }

  async getEinPrae(date: any) {
    this.einPrae.getEinteilung(date).subscribe(async (data) => {
      this.exist = data.exist;
      this.einteilung = data.text;
      if (this.exist == false) {
        this.früh = [];
        this.spät = [];
        this.nacht = [];
        this.einPrae.getF(date).subscribe(async (data) => {
          this.früh = await data;
        });
        this.einPrae.getS(date).subscribe(async (data) => {
          this.spät = await data;
        });
        this.einPrae.getN(date).subscribe(async (data) => {
          this.nacht = await data;
        });
      } else {
        this.früh = [];
        this.spät = [];
        this.nacht = [];
        for (var f = 0; f < this.einteilungF.length; f++) {
          this.einteilungF[f].list = [];
          this.einteilungF[f]['display'] = false;
          this.einteilungF[f]['rename'] = false;
        }
        for (var s = 0; s < this.einteilungS.length; s++) {
          this.einteilungS[s].list = [];
          this.einteilungS[s]['display'] = false;
          this.einteilungS[s]['rename'] = false;
        }
        for (var n = 0; n < this.einteilungN.length; n++) {
          this.einteilungN[n].list = [];
          this.einteilungN[n]['display'] = false;
          this.einteilungN[n]['rename'] = false;
        }
        var countf = 0;
        var counts = 0;
        var countn = 0;
        for (var i = 0; i < this.einteilung.length; i++) {
          if (this.einteilung[i].type == 'f') {
            countf++;
            for (var j = 0; j < this.einteilungF.length; j++) {
              if (
                this.einteilungF[j].id ==
                this.einteilung[i].role + this.einteilung[i].type
              ) {
                var Dat = new Date(this.einteilung[i].date);
                var TimeArray = this.einteilung[i].break.split(':');
                var HalfHour =
                  Dat.setHours(TimeArray[0], TimeArray[1], TimeArray[2], 0) +
                  this.halfHour;
                if (
                  new Date().getTime() > HalfHour &&
                  this.einteilung[i].break !== '66:00:00'
                ) {
                  this.einPrae
                    .updateBreak(
                      this.einteilung[i].name,
                      this.einteilung[i].date,
                      '66:00:00'
                    )
                    .subscribe(async (data) => {
                      return data;
                    });
                } else if (
                  new Date().getTime() < HalfHour &&
                  new Date().getTime() > HalfHour - this.halfHour
                ) {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungF[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: true,
                    time: this.einteilung[i].break,
                    start: this.einteilung[i].start.slice(0, 5) + '-',
                    ende: this.einteilung[i].ende.slice(0, 5),
                  });
                  continue;
                } else {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungF[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: false,
                    time: this.einteilung[i].break,
                    start: this.einteilung[i].start.slice(0, 5) + '-',
                    ende: this.einteilung[i].ende.slice(0, 5),
                  });
                  continue;
                }
                if (this.einteilung[i].break == '66:00:00') {
                  this.einteilung[i].break = '';
                } else {
                  this.einteilung[i].break = this.einteilung[i].break.substring(
                    0,
                    5
                  );
                }
                this.einteilungF[j].list.push({
                  name: this.einteilung[i].name,
                  state: this.einteilung[i].comment,
                  break: false,
                  time: this.einteilung[i].break,
                  start: this.einteilung[i].start.slice(0, 5) + '-',
                  ende: this.einteilung[i].ende.slice(0, 5),
                });
              }
            }
          } else if (this.einteilung[i].type == 's') {
            counts++;
            for (var j = 0; j < this.einteilungS.length; j++) {
              if (
                this.einteilungS[j].id ==
                this.einteilung[i].role + this.einteilung[i].type
              ) {
                var Dat = new Date(this.einteilung[i].date);
                var TimeArray = this.einteilung[i].break.split(':');
                var HalfHour =
                  Dat.setHours(TimeArray[0], TimeArray[1], TimeArray[2], 0) +
                  this.halfHour;
                if (
                  new Date().getTime() > HalfHour &&
                  this.einteilung[i].break !== '66:00:00'
                ) {
                  this.einPrae
                    .updateBreak(
                      this.einteilung[i].name,
                      this.einteilung[i].date,
                      '66:00:00'
                    )
                    .subscribe(async (data) => {
                      return data;
                    });
                } else if (
                  new Date().getTime() < HalfHour &&
                  new Date().getTime() > HalfHour - this.halfHour
                ) {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungS[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: true,
                    time: this.einteilung[i].break,
                    start: this.einteilung[i].start.slice(0, 5) + '-',
                    ende: this.einteilung[i].ende.slice(0, 5),
                  });
                  continue;
                } else {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungS[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: false,
                    time: this.einteilung[i].break,
                    start: this.einteilung[i].start.slice(0, 5) + '-',
                    ende: this.einteilung[i].ende.slice(0, 5),
                  });
                  continue;
                }
                if (this.einteilung[i].break == '66:00:00') {
                  this.einteilung[i].break = '';
                } else {
                  this.einteilung[i].break = this.einteilung[i].break.substring(
                    0,
                    5
                  );
                }
                this.einteilungS[j].list.push({
                  name: this.einteilung[i].name,
                  state: this.einteilung[i].comment,
                  break: false,
                  time: this.einteilung[i].break,
                  start: this.einteilung[i].start.slice(0, 5) + '-',
                  ende: this.einteilung[i].ende.slice(0, 5),
                });
              }
            }
          } else if (this.einteilung[i].type == 'n') {
            countn++;
            for (var j = 0; j < this.einteilungN.length; j++) {
              if (
                this.einteilungN[j].id ==
                this.einteilung[i].role + this.einteilung[i].type
              ) {
                var Dat = new Date(this.einteilung[i].date);
                var TimeArray = this.einteilung[i].break.split(':');
                var HalfHour =
                  Dat.setHours(TimeArray[0], TimeArray[1], TimeArray[2], 0) +
                  this.halfHour;
                if (
                  new Date().getTime() > HalfHour &&
                  this.einteilung[i].break !== '66:00:00'
                ) {
                  this.einPrae
                    .updateBreak(
                      this.einteilung[i].name,
                      this.einteilung[i].date,
                      '66:00:00'
                    )
                    .subscribe(async (data) => {
                      return data;
                    });
                } else if (
                  new Date().getTime() < HalfHour &&
                  new Date().getTime() > HalfHour - this.halfHour
                ) {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungN[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: true,
                    time: this.einteilung[i].break,
                    start: this.einteilung[i].start.slice(0, 5) + '-',
                    ende: this.einteilung[i].ende.slice(0, 5),
                  });
                  continue;
                } else {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungN[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: false,
                    time: this.einteilung[i].break,
                    start: this.einteilung[i].start.slice(0, 5) + '-',
                    ende: this.einteilung[i].ende.slice(0, 5),
                  });
                  continue;
                }
                if (this.einteilung[i].break == '66:00:00') {
                  this.einteilung[i].break = '';
                } else {
                  this.einteilung[i].break = this.einteilung[i].break.substring(
                    0,
                    5
                  );
                }
                this.einteilungN[j].list.push({
                  name: this.einteilung[i].name,
                  state: this.einteilung[i].comment,
                  break: false,
                  time: this.einteilung[i].break,
                  start: this.einteilung[i].start.slice(0, 5) + '-',
                  ende: this.einteilung[i].ende.slice(0, 5),
                });
              }
            }
          }
        }
        if (countf == 0) {
          this.einPrae.getF(date).subscribe(async (data) => {
            this.früh = await data;
          });
        }
        if (counts == 0) {
          this.einPrae.getS(date).subscribe(async (data) => {
            this.spät = await data;
          });
        }
        if (countn == 0) {
          this.einPrae.getN(date).subscribe(async (data) => {
            this.nacht = await data;
          });
        }
      }
    });
  }

  async getEin(date: any) {
    this.ein.getEinteilung(date).subscribe(async (data) => {
      this.exist = data.exist;
      this.einteilung = data.text;
      if (this.exist == false) {
        this.früh = [];
        this.spät = [];
        this.nacht = [];
        this.ein.getF(date).subscribe(async (data) => {
          this.früh = await data;
        });
        this.ein.getS(date).subscribe(async (data) => {
          this.spät = await data;
        });
        this.ein.getN(date).subscribe(async (data) => {
          this.nacht = await data;
        });
      } else {
        this.früh = [];
        this.spät = [];
        this.nacht = [];
        for (var f = 0; f < this.einteilungF.length; f++) {
          this.einteilungF[f].list = [];
          this.einteilungF[f]['display'] = false;
          this.einteilungF[f]['rename'] = false;
        }
        for (var s = 0; s < this.einteilungS.length; s++) {
          this.einteilungS[s].list = [];
          this.einteilungS[s]['display'] = false;
          this.einteilungS[s]['rename'] = false;
        }
        for (var n = 0; n < this.einteilungN.length; n++) {
          this.einteilungN[n].list = [];
          this.einteilungN[n]['display'] = false;
          this.einteilungN[n]['rename'] = false;
        }
        var countf = 0;
        var counts = 0;
        var countn = 0;
        for (var i = 0; i < this.einteilung.length; i++) {
          if (this.einteilung[i].type == 'f') {
            countf++;
            for (var j = 0; j < this.einteilungF.length; j++) {
              if (
                this.einteilungF[j].id ==
                this.einteilung[i].role + this.einteilung[i].type
              ) {
                var Dat = new Date(this.einteilung[i].date);
                var TimeArray = this.einteilung[i].break.split(':');
                var HalfHour =
                  Dat.setHours(TimeArray[0], TimeArray[1], TimeArray[2], 0) +
                  this.halfHour;
                if (
                  new Date().getTime() > HalfHour &&
                  this.einteilung[i].break !== '66:00:00'
                ) {
                  this.ein
                    .updateBreak(
                      this.einteilung[i].name,
                      this.einteilung[i].date,
                      '66:00:00'
                    )
                    .subscribe(async (data) => {
                      return data;
                    });
                } else if (
                  new Date().getTime() < HalfHour &&
                  new Date().getTime() > HalfHour - this.halfHour
                ) {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungF[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: true,
                    time: this.einteilung[i].break,
                  });
                  continue;
                } else {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungF[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: false,
                    time: this.einteilung[i].break,
                  });
                  continue;
                }
                if (this.einteilung[i].break == '66:00:00') {
                  this.einteilung[i].break = '';
                } else {
                  this.einteilung[i].break = this.einteilung[i].break.substring(
                    0,
                    5
                  );
                }
                this.einteilungF[j].list.push({
                  name: this.einteilung[i].name,
                  state: this.einteilung[i].comment,
                  break: false,
                  time: this.einteilung[i].break,
                });
              }
            }
          } else if (this.einteilung[i].type == 's') {
            counts++;
            for (var j = 0; j < this.einteilungS.length; j++) {
              if (
                this.einteilungS[j].id ==
                this.einteilung[i].role + this.einteilung[i].type
              ) {
                var Dat = new Date(this.einteilung[i].date);
                var TimeArray = this.einteilung[i].break.split(':');
                var HalfHour =
                  Dat.setHours(TimeArray[0], TimeArray[1], TimeArray[2], 0) +
                  this.halfHour;
                if (
                  new Date().getTime() > HalfHour &&
                  this.einteilung[i].break !== '66:00:00'
                ) {
                  this.ein
                    .updateBreak(
                      this.einteilung[i].name,
                      this.einteilung[i].date,
                      '66:00:00'
                    )
                    .subscribe(async (data) => {
                      return data;
                    });
                } else if (
                  new Date().getTime() < HalfHour &&
                  new Date().getTime() > HalfHour - this.halfHour
                ) {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungS[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: true,
                    time: this.einteilung[i].break,
                  });
                  continue;
                } else {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungS[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: false,
                    time: this.einteilung[i].break,
                  });
                  continue;
                }
                if (this.einteilung[i].break == '66:00:00') {
                  this.einteilung[i].break = '';
                } else {
                  this.einteilung[i].break = this.einteilung[i].break.substring(
                    0,
                    5
                  );
                }
                this.einteilungS[j].list.push({
                  name: this.einteilung[i].name,
                  state: this.einteilung[i].comment,
                  break: false,
                  time: this.einteilung[i].break,
                });
              }
            }
          } else if (this.einteilung[i].type == 'n') {
            countn++;
            for (var j = 0; j < this.einteilungN.length; j++) {
              if (
                this.einteilungN[j].id ==
                this.einteilung[i].role + this.einteilung[i].type
              ) {
                var Dat = new Date(this.einteilung[i].date);
                var TimeArray = this.einteilung[i].break.split(':');
                var HalfHour =
                  Dat.setHours(TimeArray[0], TimeArray[1], TimeArray[2], 0) +
                  this.halfHour;
                if (
                  new Date().getTime() > HalfHour &&
                  this.einteilung[i].break !== '66:00:00'
                ) {
                  this.ein
                    .updateBreak(
                      this.einteilung[i].name,
                      this.einteilung[i].date,
                      '66:00:00'
                    )
                    .subscribe(async (data) => {
                      return data;
                    });
                } else if (
                  new Date().getTime() < HalfHour &&
                  new Date().getTime() > HalfHour - this.halfHour
                ) {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungN[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: true,
                    time: this.einteilung[i].break,
                  });
                  continue;
                } else {
                  if (this.einteilung[i].break == '66:00:00') {
                    this.einteilung[i].break = '';
                  } else {
                    this.einteilung[i].break = this.einteilung[
                      i
                    ].break.substring(0, 5);
                  }
                  this.einteilungN[j].list.push({
                    name: this.einteilung[i].name,
                    state: this.einteilung[i].comment,
                    break: false,
                    time: this.einteilung[i].break,
                  });
                  continue;
                }
                if (this.einteilung[i].break == '66:00:00') {
                  this.einteilung[i].break = '';
                } else {
                  this.einteilung[i].break = this.einteilung[i].break.substring(
                    0,
                    5
                  );
                }
                this.einteilungN[j].list.push({
                  name: this.einteilung[i].name,
                  state: this.einteilung[i].comment,
                  break: false,
                  time: this.einteilung[i].break,
                });
              }
            }
          }
        }
        if (countf == 0) {
          this.ein.getF(date).subscribe(async (data) => {
            this.früh = await data;
          });
        }
        if (counts == 0) {
          this.ein.getS(date).subscribe(async (data) => {
            this.spät = await data;
          });
        }
        if (countn == 0) {
          this.ein.getN(date).subscribe(async (data) => {
            this.nacht = await data;
          });
        }
      }
    });
  }
}
