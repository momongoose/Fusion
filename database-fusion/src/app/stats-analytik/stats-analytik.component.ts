import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
//table imports
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-stats-analytik',
  templateUrl: './stats-analytik.component.html',
  styleUrls: ['./stats-analytik.component.css']
})
export class StatsAnalytikComponent implements OnInit {

  constructor(private app: AppComponent, private router:Router) {
    if (this.app.login == false) {
      this.router.navigate(['login']);
    }
   }

  ngOnInit(): void {
    this.getMaData()
    this.update()
  }

//all table related Stuff:

update(){
  this.updateMaData()
}

async getMaData(){
  const users: UserData[] = [];
  var Json = this.app.Stats
  if(typeof(Json) == "undefined"){
    return
  }
  for (let i = 0; i < Json.length; i++) {
    users.push(createNewUser(Json[i]));
  }//for json ins janus array
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

displayedColumns = ['name', 'pos', 'count'];

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
  await this.app.getStatsAnal()
  this.getMaData()
}

applyFilter(event: Event) {
  var filterValue = (event.target as HTMLInputElement).value;
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

}

function createNewUser(event : any): UserData {
  var array:any = Object.values(event)
  return {
    name: array[0],
    pos: array[1],
    count: array[2]
  };
}

export interface UserData {
  name: string;
  pos: string;
  count: Number;
}
