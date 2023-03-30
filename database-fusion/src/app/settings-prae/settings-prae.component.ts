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
import { EinteilungPraeService } from '../services/einteilung-prae.service';

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
  selector: 'app-settings-prae',
  templateUrl: './settings-prae.component.html',
  styleUrls: ['./settings-prae.component.css']
})
export class SettingsPraeComponent implements OnInit {

  constructor(private ein : EinteilungService, public app:AppComponent, private einPrae : EinteilungPraeService) { }

  groups: Group[] = this.app.PraeGroups.text
  types : Type[] = [{type:"good", view:"Kann es Gut"},{type:"ok", view:"Kann es"},{type:"no", view:"Kann es nicht"}]
  time:any = ""
  message:any = ""
  times: Time[] = []
  roles:Role[] = this.app.roles
  ti:any = ""
  swap: any = "x"
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
    this.einPrae.addSet("präanalytik",this.time).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
  }
  delBreakTime(){
    if(this.ti == ""){
      alert("Bitte verwende Sie die Datumsauswahl\nklicken Sie auf das Eingabefeld")
      return
    }
    this.einPrae.delSet("präanalytik",this.ti).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
  }
  async updateBreakTime(){
    this.app.getSettings("BreakTime")
    await this.delay(300)
    this.times = []
    for(var i = 0; i < this.app.settingsPräanalytik.length; i++){
      var val = this.app.settingsPräanalytik[i].value
      this.times.push({value:val, viewValue:val})
    }
  }



  wishPos:any = ""
  async updateWish(){
    if(this.wishPos == "" || this.wishPos < 9){
      alert("Eine gültige Position muss ausgewählt werden")
      return
    }
    this.einPrae.updateWish(this.clickedRow, this.wishPos).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.PraeGroups.text
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
    this.einPrae.updateRoleGroup(this.RoleValue, this.value2).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.PraeGroups.text
  }

  async addGroup(){
    if(this.value == ""){
      alert("Bitte geben Sie einen Gruppennamen ein!")
      return
    }
    this.einPrae.addGroup(this.value).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.PraeGroups.text
  }

  async remGroup(){
    if(this.value2 == ""){
      alert("Bitte einen Gruppennamen auswählen!")
      return
    }
    this.einPrae.remGroup(this.value2).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.PraeGroups.text
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
    this.einPrae.addSkill(this.KompetenzValue, this.TypeValue, this.clickedRow).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.PraeGroups.text
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
    this.einPrae.remSkill(this.RemValue, this.clickedRow).subscribe(async (data)=>{
      this.message = await data
      this.updateBreakTime()
    })
    await this.app.getMaSettings()
    this.groups = this.app.PraeGroups.text
  }

  ngOnInit(): void {
    this.updateBreakTime()
    this.getMaData()
    this.update()
  }


//all table related Stuff:

async update(){
  this.updateMaData2()
  this.updateMaData()
  this.roles = await this.app.roles
  setInterval(async()=>{
    if(typeof this.app.PraeGroups != 'undefined'){
      this.groups = this.app.PraeGroups.text
    }
    this.roles = this.app.roles
    await this.updateMaData2()
    await this.updateMaData()
    this.applyFilter(this.oldEvent)
    this.applyFilter2(this.oldEvent2)
  }, 5000)
}

async getMaData(){
  const users: UserData[] = [];
  var Json = this.app.MaSettingsPrae
  if(typeof(Json) == "undefined"){
    return
  }
  for (let i = 0; i < Json.length; i++) {
    if(Json[i].good.toString().includes(",")){
      var string = Json[i].good.toString().replaceAll(',', ', ');
      Json[i].good = string
    }
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

displayedColumns = ['id', 'name', 'good', 'ok', 'no', 'wish'];

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

async getMaRoleData(){
  const users: RoleData[] = [];
  var Json = this.app.roles
  if(typeof(Json) == "undefined"){
    return
  }
  for (let i = 0; i < Json.length; i++) {
    if(Json[i].group == null){
      Json[i].group = ""
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

displayedColumns2 = ['role_id', 'role', 'group'];

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
  await this.app.getRolesPrae()
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

}

function createNewUser(event : any): UserData {
  return {
    id: event.id,
    name: event.name,
    good: event.good,
    ok: event.ok,
    no: event.no,
    wish:event.wish
  };
}

export interface UserData {
  id: Number;
  name: string;
  good: string;
  ok: string;
  no: string;
  wish: string;
}

/*new Table Data*/

function createNewRole(event : any): RoleData {
  return {
    role_id: event.role_id,
    role: event.role,
    group: event.group
  };
}

export interface RoleData {
  role_id: Number;
  role: string;
  group: string;
}

