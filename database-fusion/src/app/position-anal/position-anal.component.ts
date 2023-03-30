import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {AppComponent} from "../app.component"
import {EinteilungAnalService} from "../services/einteilung-anal.service"
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

interface Schichten {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-position-anal',
  templateUrl: './position-anal.component.html',
  styleUrls: ['./position-anal.component.css']
})
export class PositionAnalComponent implements OnInit {

  constructor(public app : AppComponent, private ein : EinteilungAnalService, private router : Router) {
    this.app.getRolesAnal()
  }
  selectAdd : any = ""
  selectRem : any = ""
  input: any = ""
  checkI : any = ""
  checkSA : any = ""
  checkSR : any = ""
  message : any = ""

  schichten: Schichten[] = [
    {value:"s", viewValue:"Früh- und Spätschicht"},
    {value:"n", viewValue:"Nachtschicht"}
  ]

  setInput(event:any){
    this.input = event.value
  }

  FormValidationAdd(){
    if(this.input == ""){
      this.checkI = 'false'
    }
    if(this.selectAdd == "") {
      this.checkSA = 'false'
    }
    if(this.input !== ""){
      this.checkI = true
    }
    if(this.selectAdd !== "") {
      this.checkSA = true
    }
    if(this.checkSA == true && this.checkI == true){
      this.addRole()
    }
  }

  async addRole(){
    var role = { schicht : this.selectAdd, role : this.input, pos: this.app.roles[this.app.roles.length - 1].pos + 1}
    this.ein.inRole(role).subscribe(async (data)=>{
      this.message = await data
    })
    this.getTableData()
    this.app.getRolesAnal()
  }


  FormValidationRem(){
    if(this.input == ""){
      this.checkI = 'false'
    }
    if(this.selectRem == "") {
      this.checkSR = 'false'
    }
    if(this.input !== ""){
      this.checkI = true
    }
    if(this.selectRem !== "") {
      this.checkSR = true
    }
    if(this.checkSR == true && this.checkI == true){
      this.remRole()
    }
  }

  addHours(numOfHours :any, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

    return date;
  }

  swap:any = ""
  selectedPos:any = ""
  async change() {
    if(this.selectedPos == ""){
      alert("Bitte eine Position auswählen!")
      return
    } else if(this.swap == "" || this.swap.length != 3){
      alert("Bitte eine gültige Positionszahl eingeben!")
      return
    }
    //this.ein.updatePos(this.selectedPos, parseInt(this.swap)).subscribe(async (data)=>{
    //  return await data
    //})
  }

  async remRole(){
    if(this.input == "Mitarbeiter" || this.input == "Urlaub" || this.input == "Krank"){
      alert("Nein")
      return
    }
    var role = { schicht : this.selectRem, role : this.input}
    this.ein.remRole(role).subscribe(async (data)=>{
      this.message = await data
    })
    this.getTableData()
    this.app.getRolesAnal()
  }
  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  oldEvent : any;
  async addEvent(event: any) {
    await this.getTableData()
    for(var f = 0; f < this.app.einteilungF.length; f++){
      this.app.einteilungF[f].list = [{name:"", state: ""},{name:"", state: ""}]
    }
    for(var s = 0; s < this.app.einteilungS.length; s++){
      this.app.einteilungS[s].list = [{name:"", state: ""},{name:"", state: ""}]
    }
    for(var n = 0; n < this.app.einteilungN.length; n++){
      this.app.einteilungN[n].list = [{name:"", state: ""},{name:"", state: ""}]
    }
    //why I did it like this https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone/15171030#15171030
    event.value.setDate(event.value.getDate() - 2);
    this.app.date= event.value.setHours(13, 0, 0);
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

//Now comes all Stuff connected to the Table

async ngOnInit(): Promise<void> {
  this.getTableData()
  var date = new Date()
  date.setHours(24, 0, 0);
  date.setDate(date.getDate()-1);
  this.addEvent({value:date})
  this.update()
}

dataSource2:any

update(){
  setInterval(()=>{
    this.dataSource = this.dataSource
    this.dataSource2 = this.dataSource.data.slice(9)
  }, 1000)
}

//----------------------Excel Export------------------------
EXCEL_TYPE:any =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
EXCEL_EXTENSION:any = '.xlsx';
data: any;
oldevent: any = "Einteilung";
excelData: Array<any> = [];
async xlsxExport(){
  var dat = new Date(this.app.date)
  dat.setDate(dat.getDate() + 2)
  var today = this.formatDate(dat)
  for(var i = 0; i < this.app.einteilungF.length; i++){
    for(var j = 0; j < this.app.einteilungF[i].list.length; j++){
      if(this.app.einteilungF[i].list[j].name != ""){
        this.excelData.push({Schicht:this.app.einteilungF[i].id.slice(-1).toUpperCase(), Position: this.app.einteilungF[i].id.slice(0, -1), Mitarbeiter:this.app.einteilungF[i].list[j].name})
      }
    }
  }
  for(var i = 0; i < this.app.einteilungS.length; i++){
    for(var j = 0; j < this.app.einteilungS[i].list.length; j++){
      if(this.app.einteilungS[i].list[j].name != ""){
        this.excelData.push({Schicht:this.app.einteilungS[i].id.slice(-1).toUpperCase(), Position: this.app.einteilungS[i].id.slice(0, -1), Mitarbeiter:this.app.einteilungS[i].list[j].name})
      }
    }
  }
  for(var i = 0; i < this.app.einteilungN.length; i++){
    for(var j = 0; j < this.app.einteilungN[i].list.length; j++){
      if(this.app.einteilungN[i].list[j].name != ""){
        this.excelData.push({Schicht:this.app.einteilungN[i].id.slice(-1).toUpperCase(), Position: this.app.einteilungN[i].id.slice(0, -1), Mitarbeiter:this.app.einteilungN[i].list[j].name})
      }
    }
  }
  await new Promise(f => setTimeout(f, 200));
  this.exportAsExcelFile(this.excelData, this.oldevent + "_" + today)
}
public exportAsExcelFile(json: any[], excelFileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = {
    Sheets: { data: worksheet },
    SheetNames: ['data'],
  };
  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
  FileSaver.saveAs(
    data,
    fileName + this.EXCEL_EXTENSION
  );
}
formatDate(date : any) {
  return [
    this.padTo2Digits(date.getDate()),
    this.padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}
padTo2Digits(num:any) {
  return num.toString().padStart(2, '0');
}
//------------------------------------------------------------

async getTableData(){
  await this.app.getRolesAnal()
  const users: UserData[] = [];
  var Json = this.app.roles
  this.app.einteilungF = [];
  this.app.einteilungS = [];
  this.app.einteilungN = [];
  for (let i = 0; i < Json.length; i++) {
      if(Json[i].type == "f"){
        this.app.einteilungF.push({ id: Json[i].role +"f", group: Json[i].group, list: [{name : "", state : ""}], display: false, rename: false, color: Json[i].color})
      } else if(Json[i].type == "s"){
        this.app.einteilungS.push({ id: Json[i].role +"s", group: Json[i].group, list: [{name : "", state : ""}], display: false, rename: false, color: Json[i].color})
      } else if(Json[i].type == "n") {
        this.app.einteilungN.push({ id: Json[i].role +"n", group: Json[i].group, list: [{name : "", state : ""}], display: false, rename: false, color: Json[i].color})
      } else {
        alert("An Error occured!")
      }
    users.push(createNewUser(Json[i])); }//for json ins janus array
  this.dataSource = new MatTableDataSource(users);

  this.ngAfterViewInit()
  //Table data need sto update every second then everything is permanently updating and then i need to define it that it does one get Date today at the beginning
}

myControl = new FormControl();
dataSource: MatTableDataSource<UserData> | any;
filteredOptions: Observable<string[]> | undefined;


@ViewChild(MatPaginator) paginator: MatPaginator | any;
@ViewChild(MatSort) sort: MatSort | any;

displayedColumns = ['id', 'type', 'role', 'pos'];

ngAfterViewInit() {
  if(this.dataSource === undefined){
    return
  }
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}



applyFilter(event: Event) {
  var filterValue = (event.target as HTMLInputElement).value;
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

}

function createNewUser(event : any): UserData {
  return {
    id: event.role_id,
    type: event.type,
    role: event.role,
    pos: event.pos
  };
}

export interface UserData {
  id: Number;
  type: string;
  role: string;
  pos:Number;
}
