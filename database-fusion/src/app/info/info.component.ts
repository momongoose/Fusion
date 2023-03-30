import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private app : AppComponent) { }
  displayedColumns = ['code', 'text', 'count', 'moves', "date"];

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  selected = false;
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter((option2) =>
      option2.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.app.display = false
  }

  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;
  options: string[] = ['1 Tag', '1 Woche', '2 Wochen', '1 Monat'];
  myControl2 = new FormControl();
  filteredOptions2: Observable<string[]> | undefined;
  options2: string[] = [];
  text:string = ""
  time: string = '';
  dataSource: MatTableDataSource<UserData> | any;
  DataFusionStart(event: any) {
    this.options2 = [];
    switch (event) {
      case '1 Tag':
        this.time = 'day';
        for (const [key] of Object.entries(this.app.data2.day)) {
          this.options2.push(key);
        }
        this.filteredOptions2 = this.myControl2.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter2(value))
        );
        this.selected = true;
        break;
      case '1 Woche':
        this.time = 'week';
        for (const [key] of Object.entries(this.app.data2.week)) {
          this.options2.push(key);
        }
        this.filteredOptions2 = this.myControl2.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter2(value))
        );
        this.selected = true;
        break;
      case '2 Wochen':
        this.time = 'two_weeks';
        for (const [key] of Object.entries(this.app.data2.two_weeks)) {
          this.options2.push(key);
        }
        this.filteredOptions2 = this.myControl2.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter2(value))
        );
        this.selected = true;
        break;
      case '1 Monat':
        this.time = 'month';
        for (const [key] of Object.entries(this.app.data2.month)) {
          this.options2.push(key);
        }
        this.filteredOptions2 = this.myControl2.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter2(value))
        );
        this.selected = true;
        break;
  }
}

  DataFusionEnd(event: any) {
    const users: UserData[] = [];
    var Json = this.app.data2[this.time][event]
    for (let i = 1; i < this.app.data2[this.time][event].length; i++) { users.push(createNewUser(Json[i])); }//for json ins janus array
    this.dataSource = new MatTableDataSource(users);
    this.ngAfterViewInit()
  }

  ngAfterViewInit() {
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
    code: event.Errorcode.toString(),
    text: event.Errortext.toString(),
    count: event.Anzahl.toString(),
    moves: event.Movements.toString(),
    date : event.Date.toString()
  };
}

export interface UserData {
  code: string;
  text: string;
  count: string;
  moves: string;
  date: string;
}
