import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  OnInit,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { EinteilungService } from '../services/einteilung.service';

@Component({
  selector: 'app-admin-n',
  templateUrl: './admin-n.component.html',
  styleUrls: ['./admin-n.component.css'],
})
export class AdminNComponent implements OnInit {
  constructor(private app : AppComponent, private ein : EinteilungService) {
    //if (this.app.login == false) {
    //  this.router.navigate(['login']);
    //}
    this.update()
  }
  counter = 0
  update(){
    setInterval(()=>{
      this.breakTimes = this.app.settingsPooling
      this.einteilung = this.app.einteilungN
      this.connectedTo = this.app.connectedToN
      for(var n = 0; n < this.einteilung.length; n++){
        if(this.einteilung[n].list.length < 2){
          this.einteilung[n].list.push({name:"", state: ""},{name:"", state: ""})
        }
      }
    }, 1000)
  }

  formatGroupPeople() {
    if(typeof this.app.PoolingGroups == 'undefined'){
      return
    }
    var group = this.app.PoolingGroups.text
    var skills = this.app.PoolingSkills.text
    for(var i = 0; i < group.length; i++){
      this.app.Json[group[i].name] = {good:[], ok:[], no:[], wish:[]}
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
        console.log(skills[2][i].no)
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

  breakTimes:any = this.app.settingsPooling
  name:string = "";
  Add(){
    if(this.name == ""){
      return
    }else{
      this.ein.inMa(this.name, "n", this.app.date).subscribe((data)=>{
        return data
      })
      this.einteilung[0].list.push({name:this.name, state: ""})
    }
  }

  send : boolean = false;
  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  async submit(){
    this.waiting = true
    this.ein.inEinN(this.einteilung, this.app.date).subscribe((data)=>{
      return data
    })
    await this.delay(4000)
    this.waiting = false
    this.send = true;
    await this.delay(4000)
    this.send = false;
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


  einteilung: any = this.app.einteilungN;
  connectedTo: any = this.app.connectedToN;
  pre = '';
  now = '';
  waiting:boolean = false
  del:boolean = false
  delRole:any
  rol:any
  message:any
  async AddRole(){
    this.waiting = true
    var role = { schicht : "n", role : this.rol, pos: this.app.roles[this.app.roles.length - 1].pos + 1}
    this.ein.inRole(role).subscribe(async (data)=>{
      this.message = await data
    })
    this.app.getRoles()
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
    if(item.includes("Mitarbeiter") || item.includes("Urlaubs") || item.includes("Kranks")){
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
  await this.delay(1000)
  this.upate()
  this.waiting = false
}


upate() {
  this.getTableData();
  var date2 = new Date(this.app.date);
  date2.setDate(date2.getDate()); // muss auf - 1 geändert werden in prod.
  this.addEvent({ value: date2});
}

async getTableData() {
  await this.app.getRoles();
  var Json = this.app.roles;
  this.app.einteilungF = [];
  this.app.einteilungS = [];
  this.app.einteilungN = [];
  for (let i = 0; i < Json.length; i++) {
    if(Json[i].type == "f"){
      this.app.einteilungF.push({ id: Json[i].role +"f", group: Json[i].group, list: [], display: false, rename: false, color: Json[i].color})
    } else if(Json[i].type == "s"){
      this.app.einteilungS.push({ id: Json[i].role +"s", group: Json[i].group, list: [], display: false, rename: false, color: Json[i].color})
    } else if(Json[i].type == "n") {
      this.app.einteilungN.push({ id: Json[i].role +"n", group: Json[i].group, list: [], display: false, rename: false, color: Json[i].color})
    } else {
      alert("An Error occured!")
    }
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
  this.app.getEin(event.value)
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

async subRename(item:string){
  this.waiting = true
  var role = { schicht : "n", old : item, new: this.ren}
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
      while(this.app.roles[x].type != "n"){
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
      while(this.app.roles[x].type != "n"){
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
Json:any = this.app.Json
isUndefined(val:any): boolean { return typeof val == 'undefined'; }
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
  var role = { schicht : "n", role : item}
  this.ein.remRole(role).subscribe(async (data)=>{
    this.message = await data
  })
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
