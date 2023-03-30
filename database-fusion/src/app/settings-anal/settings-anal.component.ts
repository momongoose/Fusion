import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateTime } from 'ts-luxon';
import { EinteilungService } from '../services/einteilung.service';
import { AppComponent } from '../app.component';
//table imports
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { EinteilungAnalService } from '../services/einteilung-anal.service';

interface Time {
  value: string;
  viewValue: string;
}

interface Group {
  group_id: Number;
  name: string;
}

interface Type {
  type: string;
  view: string;
}

interface Role {
  role_id: Number;
  type: string;
  role: string;
  pos: Number;
  color: string;
  group:any;
}

@Component({
  selector: 'app-settings-anal',
  templateUrl: './settings-anal.component.html',
  styleUrls: ['./settings-anal.component.css']
})
export class SettingsAnalComponent implements OnInit {

  constructor(private ein : EinteilungService, public app:AppComponent, private einAnal : EinteilungAnalService) { }

  groups: Group[] = this.app.AnalytikGroups.text
  types : Type[] = [{type:"good", view:"Kann es Gut"},{type:"ok", view:"Kann es"},{type:"no", view:"Kann es nicht"}]
  tipes : Type[] = [{type:"good", view:"Macht es gerne"},{type:"ok", view:"Macht es"},{type:"no", view:"Macht es nicht gerne"}]
  time:any = ""
  message:any = ""
  times: Time[] = []
  roles:Role[] = this.app.roles
  ti:any = ""
  swap: any = "k"
  value:any = ""
  value2:any = ""
  KompetenzValue:any = ""
  TypeValue:any = ""
  RemValue:any = ""
  RoleValue:any = ""

  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  addBreakTime(){
    if(this.time == ""){
      alert("Bitte verwende Sie die Datumsauswahl\nklicken Sie auf das Eingabefeld")
      return
    }
    this.einAnal.addSet("analytik",this.time).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
  }
  delBreakTime(){
    if(this.ti == ""){
      alert("Bitte verwende Sie die Datumsauswahl\nklicken Sie auf das Eingabefeld")
      return
    }
    this.einAnal.delSet("analytik",this.ti).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
  }
  async updateBreakTime(){
    this.app.getSettings("BreakTime")
    await this.delay(300)
    this.times = []
    for(var i = 0; i < this.app.settingsAnalytik.length; i++){
      var val = this.app.settingsAnalytik[i].value
      this.times.push({value:val, viewValue:val})
    }
  }

  async updateRoleGroup() {
    if(this.RoleValue == ""){
      alert("Bitte eine Rolle auswählen!")
      return
    }
    if(this.value2 == ""){
      alert("Bitte wäheln Sie eine Kompetenzgruppe")
      return
    }
    this.einAnal.updateRoleGroup(this.RoleValue, this.value2).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.AnalytikGroups.text
  }

  async addGroup(){
    if(this.value == ""){
      alert("Bitte geben Sie einen Gruppennamen ein!")
      return
    }
    this.einAnal.addGroup(this.value).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.AnalytikGroups.text
  }

  async remGroup(){
    if(this.value2 == ""){
      alert("Bitte einen Gruppennamen auswählen!")
      return
    }
    this.einAnal.remGroup(this.value2).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.AnalytikGroups.text
  }

  oldKomp = ""
  oldName = ""
  async addSkill(){
    if(this.oldKomp == this.KompetenzValue && this.oldName == this.clickedRow){
      alert("Sie haben diese Daten bereits hinzugefügt, bitte warte Sie 5sek. bis es  in der Tabelle erscheint.")
      return
    }
    if(this.KompetenzValue == ""){
      alert("Bitte geben Sie einen Kompetenznamen ein!")
      return
    }
    if(this.TypeValue == ""){
      alert("Bitte wählen Sie die Kompetenz aus!")
      return
    }
    if(this.clickedRow == ""){
      alert("Bitte klicken Sie auf einen Namen in der Tabelle!")
      return
    }
    this.oldKomp = this.KompetenzValue
    this.oldName = this.clickedRow
    this.einAnal.addSkill(this.KompetenzValue, this.TypeValue, this.clickedRow).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.AnalytikGroups.text
  }

  WishTypeValue:any = ""
  wishPos:any = ""
  async updateWish(){
    if(this.clickedRow == ""){
      alert("Bitte klicken Sie auf einen Namen in der Tabelle!")
      return
    }
    if(this.wishPos == ""  || this.wishPos < 10){
      alert("Eine gültige Position muss ausgewählt werden")
      return
    }
    if(this.WishTypeValue == "" ){
      alert("Eine gültige Wunschart muss ausgewählt werden")
      return
    }
    this.einAnal.updateWish(this.clickedRow, this.wishPos, this.WishTypeValue).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.AnalytikGroups.text
  }

  async remWish(){
    if(this.clickedRow == ""){
      alert("Bitte klicken Sie auf einen Namen in der Tabelle!")
      return
    }
    if(this.wishPos == ""  || this.wishPos < 10){
      alert("Eine gültige Position muss ausgewählt werden")
      return
    }
    if(this.WishTypeValue == "" ){
      alert("Eine gültige Wunschart muss ausgewählt werden")
      return
    }
    this.einAnal.remWish(this.clickedRow, this.wishPos, this.WishTypeValue).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.AnalytikGroups.text
  }

  async remSkill(){
    this.RemValue = this.KompetenzValue
    if(this.RemValue == ""){
      alert("Bitte einen Gruppennamen auswählen!")
      return
    }
    if(this.clickedRow == ""){
      alert("Bitte klicken Sie auf einen Namen in der Tabelle!")
      return
    }
    this.einAnal.remSkill(this.RemValue, this.clickedRow).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.AnalytikGroups.text
  }

  ngOnInit(): void {
    this.updateBreakTime()
    this.getMaData()
    this.update()
  }


//all table related Stuff:

async update(){
  this.updateMaData3()
  this.updateMaData2()
  this.updateMaData()
  this.roles = await this.app.roles
  setInterval(async()=>{
    if(typeof this.app.AnalytikGroups != 'undefined'){
      this.groups = this.app.AnalytikGroups.text
    }
    this.roles = this.app.roles
    await this.updateMaData3()
    await this.updateMaData2()
    await this.updateMaData()
    this.applyFilter(this.oldEvent)
    this.applyFilter2(this.oldEvent2)
  }, 5000)
}

async getMaData(){
  const users: UserData[] = [];
  var Json = this.app.MaSettingsAnalytik
  if(typeof(Json) == "undefined"){
    return
  }
  for (let i = 0; i < Json.length; i++) {
    users.push(createNewUser(Json[i])); }//for json ins janus array
  this.dataSource = new MatTableDataSource(users);

  this.ngAfterViewInit()
  //Table data need sto update every second then everything is permanently updating and then i need to define it that it does one get Date today at the beginning
}

myControl = new FormControl();
dataSource: MatTableDataSource<UserData> | any;
filteredOptions: Observable<string[]> | undefined;
clickedRows = new Set<UserData>();
clickedRow : any = "";
oldRow:any = ""

@ViewChild(MatPaginator) paginator: MatPaginator | any;
@ViewChild(MatSort) sort: MatSort | any;

displayedColumns = ['id', 'name', 'good', 'ok', 'no'];

ngAfterViewInit() {
  if(this.dataSource === undefined){
    return
  }
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

setSelected(value:any){
  if(this.oldRow != ""){
    this.clickedRows.delete(this.oldRow)
  }
  this.clickedRows.add(value)
  this.clickedRow = value.name
  this.oldRow = value
}

async updateMaData(){
  await this.app.getMaSettings()
  this.getMaData()
}

oldEvent:any = ""
applyFilter(event: any) {
  if(typeof event.target == "undefined"){
    return
  }
  this.oldEvent = event
  var filterValue = (event.target as HTMLInputElement).value;
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}


//all role table related Stuff:
wishSet : any = []
async getMaRoleData(){
  const users: RoleData[] = [];
  this.wishSet = []
  var Json = this.app.roles
  if(typeof(Json) == "undefined"){
    return
  }
  for (let i = 0; i < Json.length; i++) {
    if(Json[i].group == null){
      Json[i].group = ""
    }
    if(Json[i].role.includes("(")){
      this.wishSet.push(Json[i])
    }
    users.push(createNewRole(Json[i])); }//for json ins janus array
  this.dataSource2 = new MatTableDataSource(users);
  this.ngAfterViewInit2()
}

myControl2 = new FormControl();
dataSource2: MatTableDataSource<RoleData> | any;
filteredOptions2: Observable<string[]> | undefined;
clickedRows2 = new Set<RoleData>();
clickedRow2 : any = "";
oldRow2:any = ""

@ViewChild(MatPaginator) paginator2: MatPaginator | any;
@ViewChild(MatSort) sort2: MatSort | any;

displayedColumns2 = ['role_id', 'type', 'role', 'group'];

ngAfterViewInit2() {
  if(this.dataSource2 === undefined){
    return
  }
  this.dataSource2.paginator = this.paginator2;
  this.dataSource2.sort = this.sort2;
}


setSelected2(value:any){
  if(this.oldRow2 != ""){
    this.clickedRows2.delete(this.oldRow2)
  }
  this.clickedRows2.add(value)
  this.clickedRow2 = value.role_id
  this.oldRow2 = value
  this.RoleValue = this.clickedRow2
}

async updateMaData2(){
  await this.app.getRolesAnal()
  this.getMaRoleData()
}

oldEvent2:any = ""
applyFilter2(event: any) {
  if(typeof event.target == "undefined"){
    return
  }
  this.oldEvent2 = event
  var filterValue = (event.target as HTMLInputElement).value;
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource2.filter = filterValue;
}

//all role table related Stuff:
async getMaData2(){
  const users: UserData2[] = [];
  this.app.AnalytikWishArray = []
  var Json = this.app.AnalytikWish.text
  if(typeof(Json) == "undefined"){
    return
  }
  for (let i = 0; i < Json.length; i++) {
    this.app.AnalytikWishArray.push(Object.keys(Json[i])[0])
    users.push(createNewUser2(Json[i])); }//for json ins janus array
  this.dataSource3 = new MatTableDataSource(users);
  this.ngAfterViewInit3()
}

myControl3 = new FormControl();
dataSource3: MatTableDataSource<RoleData> | any;
filteredOptions3: Observable<string[]> | undefined;
clickedRows3 = new Set<RoleData>();
clickedRow3 : any = "";
oldRow3:any = ""

@ViewChild(MatPaginator) paginator3: MatPaginator | any;
@ViewChild(MatSort) sort3: MatSort | any;

displayedColumns3 = ['name', 'good', 'ok', 'no'];

ngAfterViewInit3() {
  if(this.dataSource3 === undefined){
    return
  }
  this.dataSource3.paginator = this.paginator3;
  this.dataSource3.sort = this.sort3;
}


async updateMaData3(){
  await this.app.getMaSettings()
  this.getMaData2()
}

oldEvent3:any = ""
applyFilter3(event: any) {
  if(typeof event.target == "undefined"){
    return
  }
  this.oldEvent3 = event
  var filterValue = (event.target as HTMLInputElement).value;
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource3.filter = filterValue;
}

}

function createNewUser(event : any): UserData {
  return {
    id: event.id,
    name: event.name,
    good: event.good,
    ok: event.ok,
    no: event.no
  };
}

export interface UserData {
  id: Number;
  name: string;
  good: string;
  ok: string;
  no: string;
}

/*new Table Data*/

function createNewRole(event : any): RoleData {
  return {
    role_id: event.role_id,
    type: event.type.toUpperCase(),
    role: event.role,
    group: event.group
  };
}

export interface RoleData {
  role_id: Number;
  type: string;
  role: string;
  group: string;
}

/*new Table Data*/

function createNewUser2(event : any): UserData2 {
  return {
    name: Object.keys(event)[0],
    good: event[Object.keys(event)[0]].good,
    ok: event[Object.keys(event)[0]].ok,
    no: event[Object.keys(event)[0]].no
  };
}

export interface UserData2 {
  name: string;
  good: string;
  ok: string;
  no: string;
}
