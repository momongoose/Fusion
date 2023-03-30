import { Component, AfterViewInit, ViewChild, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { EinteilungAnalService } from '../services/einteilung-anal.service';

@Component({
  selector: 'app-admin-f-anal',
  templateUrl: './admin-f-anal.component.html',
  styleUrls: ['./admin-f-anal.component.css']
})
export class AdminFAnalComponent implements OnInit {
  constructor(public app : AppComponent, private ein : EinteilungAnalService) {
    //if (this.app.login == false) {
    //  this.router.navigate(['login']);
    //}
    this.update()
  }
  einteilung:any = this.app.einteilungF;
  connectedTo:any = this.app.connectedToF;
  pre = '';
  now = '';
  urlaub = ""
  krank = ""
  counter = 0

  update(){
    setInterval(()=>{
      this.breakTimes = this.app.settingsAnalytik
      this.einteilung = this.app.einteilungF
      this.connectedTo = this.app.connectedToF
      for(var n = 0; n < this.einteilung.length; n++){
        if(this.einteilung[n].list.length < 2){
          this.einteilung[n].list.push({name:"", state: ""},{name:"", state: ""})
        }
      }
      this.checkRoles()
    }, 2000)
  }

  async formatGroupPeople() {
    if(typeof this.app.AnalytikGroups == 'undefined' || typeof this.app.AnalytikSkills == 'undefined' ){
      return
    }
    var group = this.app.AnalytikGroups.text
    var skills = this.app.AnalytikSkills.text
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

  breakTimes:any = this.app.settingsAnalytik
  name:string = "";
  Add(){
    if(this.name == ""){
      return
    }else{
      this.ein.inMa(this.name, "f", this.app.date).subscribe((data)=>{
        return data
      })
      this.einteilung[0].list.push({name:this.name, state: ""})
    }
  }

deletePerson(person:any){
  this.delPerson = person
  if(this.app.exist == false){
    alert("Du brauchst eine Einteilung um eine Person zu löschen")
  }
  this.del2 = true
}
del2:any
delPerson:any = ""
delCancel2(){
  this.del2 = false
}

async removePerson(){
  var item = this.delPerson
  if(item == ""){
    alert("Nein")
    return
  }
  this.waiting = true
  this.ein.remEin(item, this.app.date).subscribe(async (data)=>{
    this.message = await data
  })
  this.sync()
  this.del2 = false
}


  send : boolean = false;
  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  async submit(){
    this.waiting = true
    this.ein.inEinF(this.einteilung, this.app.date).subscribe((data)=>{
      return data
    })
    await this.delay(4000)
    this.waiting = false
    this.send = true;
    await this.delay(4000)
    this.send = false;
  }

  waiting:boolean = false
  del:boolean = false
  delRole:any
  rol:any
  message:any
  async AddRole(){
    this.waiting = true
    var role = { schicht : "f", role : this.rol, pos: this.app.roles[this.app.roles.length - 1].pos + 1}
    this.ein.inRole(role).subscribe(async (data)=>{
      this.message = await data
    })
    this.app.getRolesAnal()
    this.sync()
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.pre = event.previousContainer.id;
    this.now = event.container.id;
    if (this.now == this.pre) {
      return;
    }

    /*if (event.container.data[event.currentIndex] !== '') {
      console.log(
        'added ' + this.now + ' | ' + event.container.data[event.currentIndex]
      );
      console.log(
        'removed ' + this.pre + ' | ' + event.container.data[event.currentIndex]
      );
    }*/
  }


  Rename(item:string){
    if(item.includes("Mitarbeiter") || item.includes("Urlaub") || item.includes("Krank")){
      alert("Nein")
      return
    }
    for(var t = 0; t < this.einteilung.length; t++){
      if(this.einteilung[t].id == item){
        if(this.einteilung[t].rename == true){
          this.einteilung[t].rename = false
          return
        }
        this.einteilung[t].rename = true
      }
    }
  }

ren = ""
async sync(){
  await this.upate()
  this.waiting = false
}


async upate() {
  await this.getTableData();
  var date2 = new Date(this.app.date);
  date2.setDate(date2.getDate()); // muss auf - 1 geändert werden in prod.
  await this.addEvent({ value: date2});
  this.checkRoles()
}

async checkRoles(){
  var roles = this.app.roles
  if(typeof roles == 'undefined'){
    return
  }
    for (var i = 0; i < roles.length; i++) {
      if(roles[i].type == "f"){
        for(var j = 0; j < this.einteilung.length; j++){
          if(roles[i].active == 0 && this.einteilung[j].id == roles[i].role + 'f' && this.einteilung[j].list[0].name == "" ){
            this.einteilung.splice(j,1)
            j--
          }
        }
      } else {
        continue
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

oldDisplay:any = ""
disable(event:any){
  var div:any = document.getElementById(event);
  this.oldDisplay = div.style.display
  if(div.style.display == 'none'){
    div.style.display = ""
  } else {
    div.style.display = 'none';
  }
}

async addEvent(event: any) {
  for(var f = 0; f < this.app.einteilungF.length; f++){
    this.app.einteilungF[f].list = [{name:"", state: ""},{name:"", state: ""}]
  }
  for(var s = 0; s < this.app.einteilungS.length; s++){
    this.app.einteilungS[s].list = [{name:"", state: ""},{name:"", state: ""}]
  }
  for(var n = 0; n < this.app.einteilungN.length; n++){
    this.app.einteilungN[n].list = [{name:"", state: ""},{name:"", state: ""}]
  }
  await this.delay(100)
  this.app.getEinAnal(event.value)
  await this.delay(500)
  for(var i = 0; i < this.app.früh.length; i++){
    if(this.app.früh[i].bemerkung.toLowerCase().includes('krank')){
      this.app.einteilungF[2].list.push({name:this.app.früh[i].name, state:this.app.früh[i].bemerkung})
    } else if (this.app.früh[i].bemerkung.toLowerCase().includes('urlaub')){
      this.app.einteilungF[1].list.push({name:this.app.früh[i].name, state:this.app.früh[i].bemerkung})
    } else {
      this.app.einteilungF[0].list.push({name:this.app.früh[i].name, state:this.app.früh[i].bemerkung})
    }
  }
  for(var i = 0; i < this.app.spät.length; i++){
    if(this.app.spät[i].bemerkung.toLowerCase().includes('krank')){
      this.app.einteilungS[2].list.push({name:this.app.spät[i].name, state:this.app.spät[i].bemerkung})
    } else if (this.app.spät[i].bemerkung.toLowerCase().includes('urlaub')){
      this.app.einteilungS[1].list.push({name:this.app.spät[i].name, state:this.app.spät[i].bemerkung})
    } else {
      this.app.einteilungS[0].list.push({name:this.app.spät[i].name, state:this.app.spät[i].bemerkung})
    }
  }
  for(var i = 0; i < this.app.nacht.length; i++){

    if(this.app.nacht[i].bemerkung.toLowerCase().includes('krank')){
      this.app.einteilungN[2].list.push({name:this.app.nacht[i].name, state:this.app.nacht[i].bemerkung})
    } else if (this.app.nacht[i].bemerkung.toLowerCase().includes('urlaub')){
      this.app.einteilungN[1].list.push({name:this.app.nacht[i].name, state:this.app.nacht[i].bemerkung})
    } else {
      this.app.einteilungN[0].list.push({name:this.app.nacht[i].name, state:this.app.nacht[i].bemerkung})
    }
  }
  this.app.connectListsF(this.app.einteilungF)
  this.app.connectListsS(this.app.einteilungS)
  this.app.connectListsN(this.app.einteilungN)
}
Json:any = this.app.Json
isUndefined(val:any): boolean { return typeof val == 'undefined'; }
async subRename(item:string){
  this.waiting = true
  var role = { schicht : "f", old : item, new: this.ren}
  this.ein.rename(role).subscribe(async (data)=>{
    this.message = await data
  })
  this.ren = ""
  this.sync()
}

updatePosLeft(item:string){
  if(item.includes("Mitarbeiter") || item.includes("Urlaub") || item.includes("Krank")){
    alert("Nein")
    return
  }
  this.waiting = true
  for(var t = 0; t < this.app.roles.length; t++){
    if(this.app.roles[t].role == item){
      var x = t - 1
      if(this.app.roles[x].role.includes("Krank")){
        alert("Nein")
        return
      }
      while(this.app.roles[x].type != "f"){
        x -= 1
        if(this.app.roles[x].role.includes("Krank")){
          alert("Nein")
          return
        }
      }
      this.ein.updatePos(this.app.roles[x].pos, this.app.roles[t].pos, this.app.roles[t].role_id, this.app.roles[x].role_id).subscribe(async (data)=>{
        this.message = await data
      })
    }
  }
  this.sync()
}

updatePosRight(item:string){
  if(item.includes("Mitarbeiter") || item.includes("Urlaub") || item.includes("Krank")){
    alert("Nein")
    return
  }
  this.waiting = true
  for(var t = 0; t < this.app.roles.length; t++){
    if(this.app.roles[t].role == item){
      var x = 1 + t
      if(typeof this.app.roles[x] === 'undefined'){
        alert("Nein")
        return
      }
      while(this.app.roles[x].type != "f"){
        x += 1
        if(typeof this.app.roles[x] === 'undefined'){
          alert("Nein")
          return
        }
      }
      this.ein.updatePos(this.app.roles[x].pos, this.app.roles[t].pos, this.app.roles[t].role_id, this.app.roles[x].role_id).subscribe(async (data)=>{
        this.message = await data
      })
    }
  }
  this.sync()
}
selected:any;
display(item:string){
  for(var t = 0; t < this.einteilung.length; t++){
    if(this.einteilung[t].id == item){
      if(this.einteilung[t].display == true){
        this.einteilung[t].display = false
        return
      }
      this.einteilung[t].display = true
    }
  }
}

changeColor(color:string, item:string){
  for(var t = 0; t < this.einteilung.length; t++){
    if(this.einteilung[t].id == item){
      this.einteilung[t].color = color
    }
  }
}

async remRole(item:string){
  this.delRole = item
  this.del = true
}

delCancel(){
  this.del = false
}

async removeRole(){
  var item = this.delRole
  if(item == "Mitarbeiter" || item == "Urlaub" || item == "Krank"){
    alert("Nein")
    return
  }
  this.waiting = true
  var role = { schicht : "f", role : item}
  this.ein.remRole(role).subscribe(async (data)=>{
    this.message = await data
  })
  await this.delay(600)
  this.sync()
  this.del = false
}

//change(item:string){
//  for(var t = 0; t < this.einteilung.length; t++){
//    for(var z = 0; z < this.einteilung[t].list.length; z++){
//      if(this.einteilung[t].list[z].name == item){
//        if(this.einteilung[t].list[z].state.includes("früh") || this.einteilung[t].list[z].state.includes("spät")){
//          this.einteilung[t].list[z].state = this.einteilung[t].list[z].state.slice(0, -4)
//        }
//        this.einteilung[t].list[z].state = this.einteilung[t].list[z].state.concat(this.selected)
//        return
//      }
//    }
//  }
//}

Break(brek:any, name:any, item:any){
  //this.waiting = true
  if(brek !== "66:00"){
    item.time = brek
  } else {
    item.time = ""
  }
  this.ein.updateBreak(name, this.app.date, brek).subscribe((data)=>{
    return data
  })
  //this.sync()
}


  ngOnInit(): void {}
}
