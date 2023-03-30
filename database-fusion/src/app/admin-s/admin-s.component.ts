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
import { timeThursday } from 'd3';

@Component({
  selector: 'app-admin-s',
  templateUrl: './admin-s.component.html',
  styleUrls: ['./admin-s.component.css']
})
export class AdminSComponent implements OnInit {
  constructor(public app : AppComponent, private ein : EinteilungService) {
    //if (this.app.login == false) {
    //  this.router.navigate(['login']);
    //}
    this.formatGroupPeople()
    this.update()
  }
counter = 0
  update(){
    setInterval(()=>{
      this.einteilung = this.app.einteilungS;
      this.connectedTo = this.app.connectedToS
      this.breakTimes = this.app.settingsPooling
      for(var s = 0; s < this.einteilung.length; s++){
        if(this.einteilung[s].list.length < 2){
          this.einteilung[s].list.push({name:"", state: ""},{name:"", state: ""})
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
          this.Json[0].wish.push(name + '|' + skills[0][i].role);
        }
      }
    }
    for (var i = 0; i < skills[1].length; i++) {
      if (typeof skills[1][i].role != 'undefined' && typeof skills[1][i].ok != 'undefined' && skills[1][i].role != null && skills[1][i].ok != null) {
        var name = skills[1][i].name;
        var skill = skills[1][i].ok;
        this.Json[skill].ok.push(name);
        if (skills[1][i].role != '' && typeof this.Json[skill] != 'undefined') {
          this.Json[0].wish.push(name + '|' + skills[1][i].role);
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
          this.Json[0].wish.push(name + '|' + skills[2][i].role);
        }
      }
    }
    /*
    for (var i = 0; i < skills[3].length; i++) {
      if (typeof skills[3][i].role != 'undefined' && skills[3][i].role != null) {
        var name = skills[3][i].name;
        if (skills[3][i].role != '') {
          this.Json[0].wish.push(name + '|' + skills[3][i].role);
        }
      }
    }*/
  }
  isUndefined(val:any): boolean { return typeof val == 'undefined'; }
  send : boolean = false;
  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  async submit(){
    this.waiting = true
    this.ein.inEinS(this.einteilung, this.app.date).subscribe(async (data)=>{
      return await data
    })
    await this.delay(4000)
    this.waiting = false
    this.send = true;
    await this.delay(4000)
    this.send = false;
  }

  einteilung: any = this.app.einteilungS;
  connectedTo: any = this.app.connectedToS;
  pre = '';
  now = '';
  selected:any;
  waiting:boolean = false
  del:boolean = false
  delRole:any
  breakTimes:any = this.app.settingsPooling
  Json:any = this.app.Json

  name:string = "";
  Add(){
    if(this.name == ""){
      return
    }else{
      this.ein.inMa(this.name, "s", this.app.date).subscribe((data)=>{
        return data
      })
      this.einteilung[0].list.push({name:this.name, state: ""})
    }
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

upate() {
  this.getTableData();
  var date2 = new Date(this.app.date);
  date2.setDate(date2.getDate()); // muss auf - 1 geändert werden in prod.
  this.addEvent({ value: date2});
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
  var role = { schicht : "s", old : item, new: this.ren}
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
      while(this.app.roles[x].type != "s"){
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
      while(this.app.roles[x].type != "s"){
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

  rol:any
  message:any
  async AddRole(){
    this.waiting = true
    var role = { schicht : "s", role : this.rol, pos: this.app.roles[this.app.roles.length - 1].pos + 1}
    this.ein.inRole(role).subscribe(async (data)=>{
      this.message = await data
    })
    await this.app.getRoles()
    this.sync()
  }

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
    var role = { schicht : "s", role : item}
    this.ein.remRole(role).subscribe(async (data)=>{
      this.message = await data
    })
    this.sync()
    this.del = false
  }

  change(item:string){
    for(var t = 0; t < this.einteilung.length; t++){
      for(var z = 0; z < this.einteilung[t].list.length; z++){
        if(this.einteilung[t].list[z].name == item){
          if(this.einteilung[t].list[z].state.includes("früh") || this.einteilung[t].list[z].state.includes("spät")){
            this.einteilung[t].list[z].state = this.einteilung[t].list[z].state.slice(0, -4)
          }
          this.einteilung[t].list[z].state = this.einteilung[t].list[z].state.concat(this.selected)
          return
        }
      }
    }
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
/*
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  displayedColumns = ['pos1', 'pos2', 'pos3', 'pos4', 'pos5'];
  dataSource: MatTableDataSource<UserData> | any;
  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;
  myControl2 = new FormControl();
  filteredOptions2: Observable<string[]> | undefined;
  myControl3 = new FormControl();
  filteredOptions3: Observable<string[]> | undefined;
  myControl4 = new FormControl();
  filteredOptions4: Observable<string[]> | undefined;
*/
  poolaufloesenN = [''];
  janus_uebernahme = [''];
  probendisponentN = [''];
  plattentracking1OG = [''];
  plattentracking2OG = [''];
  poolaufloesen1OG = [''];
  poolaufloesen2OG = [''];
  ma01 = [''];
  raum162 = [''];
  raum22 = [''];
  raum23 = [''];
  raum24 = [''];
  raum25 = [''];
  raum26 = [''];
  raum27 = [''];
  raum01 = [''];
  raum02 = [''];
  raum04 = [''];
  probendisponent2 = [''];
  plattentracking2 = [''];
  springerA = [''];
  springerB = [''];
  springerC = [''];
  springerD = [''];
  springerE = [''];
  springerF = [''];
  NE = [''];
  NES = [''];
  raum11 = [''];
  raum12 = [''];
  raum13 = [''];
  raum15_16 = [''];
  raum7_8 = [''];
  probendisponent = [''];
  raum9 = [''];
  plattentracking = [''];
  raum101 = [''];
  raum102 = [''];
  raum103 = [''];
  raum104 = [''];
  mist = [''];
  springerSpaet = [''];

/*
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter((option2) =>
      option2.toLowerCase().includes(filterValue)
    );
  }
  private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options3.filter((option3) =>
      option3.toLowerCase().includes(filterValue)
    );
  }
  private _filter4(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options4.filter((option4) =>
      option4.toLowerCase().includes(filterValue)
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      console.log(file)
    }
  }

  options: string[] = [
    'Raphael Janu',
    'Günther Wolf',
    'Peter Max',
    'Joseph Gurgelbauer',
  ];
  options2: string[] = [];
  options3: string[] = [];
  options4: string[] = [];
  fileName = '';
  valueA: string = '';
  valueB: string = '';
  setValueA(event: string) {
    this.valueA = event;
    //Object.keys(this.dataSource[0]).forEach(function(k){
    //  console.log(k);
    //});
  }

  setValueB(event: string) {
    this.valueB = event;
  }

  Add(event: string) {
    if (this.valueA == '') {
      alert('Bitte wählen Sie einen Namen zum einteilen');
    } else {
      //createNewUser()
    }
  }

  Remove(event: string) {
    console.log(event);
  }

  applyFilter(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  LoadData() {
    const users: UserData[] = [];
    var Json = ELEMENT_DATA;
    for (let i = 1; i < Json.length; i++) {
      users.push(createNewUser(Json[i]));
    } //for json ins janus array
    this.dataSource = new MatTableDataSource(users);
    this.ngAfterViewInit();
  }*/

  ngAfterViewInit() {
  /*  this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;*/
  }

  ngOnInit(): void {
    /*this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter2(value))
    );
    this.filteredOptions3 = this.myControl3.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter3(value))
    );
    this.filteredOptions4 = this.myControl4.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter4(value))
    );
    this.LoadData();*/
  }
}
