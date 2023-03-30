import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { EinteilungPraeService } from '../services/einteilung-prae.service';

@Component({
  selector: 'app-display-prae',
  templateUrl: './display-prae.component.html',
  styleUrls: ['./display-prae.component.scss']
})
export class DisplayPraeComponent implements OnInit {
  constructor(private router: Router, private app: AppComponent, private ein : EinteilungPraeService) {
    /*if (this.app.login == false) {
      this.router.navigate(['login']);
    }*/
    this.app.display = true;
    this.getTableData();
  }

  date: any;
  monkey: boolean = false;
  selectedIndex: number = 0;
  einteilungF: any;
  einteilungS: any;
  einteilungN: any;
  früh: any;
  spät: any;
  nacht: any;
  on: boolean = false;

  update() {
    this.getTableData();
    var date2 = new Date();
    date2.setTime(date2.getTime() + 1 * 60 * 60 * 1000);
    date2.setDate(date2.getDate() - 2); // muss auf - 1 geändert werden in prod.
    this.addEvent({ value: date2 });
    var newDate = date2;
    newDate.setDate(newDate.getDate() + 2);
    var dd = String(newDate.getDate()).padStart(2, '0');
    var mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = newDate.getFullYear();
    this.date = dd + '.' + mm + '.' + yyyy;
    this.getMaSettings()
  }

  //MaSettings:any
  //Groups:any
  Skills:any
  Json:any = {
    good:[],
    ok:[],
    no:[]
  }
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
        this.formateSkills()
  }

  formateSkills(){
    this.Json = {
      good:[],
      ok:[],
      no:[]
    }
    this.Skills = this.Skills.text
    for(var i = 0; i < this.Skills[0].length; i++){
      if(typeof this.Skills[0][i] == 'undefined'){
        continue
      }
      var name = this.Skills[0][i].name
      if(this.Skills[0][i].good == "Einschulung"){
        this.Json.good.push(name)
      }
    }
    for(var i = 0; i < this.Skills[1].length; i++){
      if(typeof this.Skills[1][i] == 'undefined'){
        continue
      }
      var name = this.Skills[1][i].name
      if(this.Skills[1][i].ok == "Einschulung"){
        this.Json.ok.push(name)
      }
    }
    for(var i = 0; i < this.Skills[2].length; i++){
      if(typeof this.Skills[2][i] == 'undefined'){
        continue
      }
      var name = this.Skills[2][i].name
      if(this.Skills[2][i].no == "Einschulung"){
        this.Json.no.push(name)
      }
    }
  }

  async getTableData() {
    await this.app.getRolesPrae();
    var Json = this.app.roles;
    this.app.einteilungF = [];
    this.app.einteilungS = [];
    this.app.einteilungN = [];
    for (let i = 0; i < Json.length; i++) {
      if(Json[i].type == "f"){
        this.app.einteilungF.push({ id: Json[i].role +"f", list: [], display: false, rename: false, color: Json[i].color})
      } else if(Json[i].type == "s"){
        this.app.einteilungS.push({ id: Json[i].role +"s", list: [], display: false, rename: false, color: Json[i].color})
      } else if(Json[i].type == "n") {
        this.app.einteilungN.push({ id: Json[i].role +"n", list: [], display: false, rename: false, color: Json[i].color})
      } else {
        alert("An Error occured!")
      }
    }
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
    this.app.getEinPrae(event.value);
    await this.delay(250);
    this.einteilungF = this.app.einteilungF.splice(
      3,
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
    for (var s = 0; s < this.einteilungS.length; s++) {
      if(this.einteilungS[s].list.length == 0){
        this.einteilungS.splice(s, 1);
        s--
      }
    }
  }
  rotate() {
    setInterval(() => {
      if(this.router.url !== "/displayPraeanalytik"){
        return
      }
      this.update();
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
