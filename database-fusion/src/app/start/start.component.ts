import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  constructor(private app: AppComponent) {
    this.getScreenSize();
  }
  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;
  options: string[] = ['1 Tag', '1 Woche', '2 Wochen', '1 Monat'];
  selected = false;
  selected3 = false;
  myControl2 = new FormControl();
  filteredOptions2: Observable<string[]> | undefined;
  options2: string[] = ['10', '20', '30'];
  screenHeight: any;
  screenWidth: any;
  chartSize: any = [1800, 800];
  grid: any = true;
  oldvalue = '';
  counter = 0;
  time: string = '';
  data: any;
  oldevent: any;
  text: string = '';
  des: any = {
    "errorcode" : "Bedeutung des Errorcodes"
  };

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 1200) {
      this.chartSize = [1000, 600];
      this.grid = false;
    } else {
      this.chartSize = [1800, 800];
      this.grid = true;
    }
  }


  DataFusionStart(event: any) {
    this.data = this.app.data;
    this.options2 = [];
    switch (event) {
      case '1 Tag':
        this.time = 'day';
        for (const [key] of Object.entries(this.data.day)) {
          this.options2.push(key);
        }
        break;
      case '1 Woche':
        this.time = 'week';
        for (const [key] of Object.entries(this.data.week)) {
          this.options2.push(key);
        }
        break;
      case '2 Wochen':
        this.time = 'two_weeks';
        for (const [key] of Object.entries(this.data.two_weeks)) {
          this.options2.push(key);
        }
        break;
      case '1 Monat':
        this.time = 'month';
        for (const [key] of Object.entries(this.data.month)) {
          this.options2.push(key);
        }
        break;
    }
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter2(value))
    );
    this.selected = true;
  }

  DataFusionEnd(event: any) {
    this.saleData = [];
    this.excelData = []
    this.oldevent = event;
    var Data: any;
    if (event == 'all') {
      for (const [key, value] of Object.entries(this.data[this.time][event])) {
        var rel =
          this.data[this.time][event][key][0] /
          this.data[this.time][event][key][1];
        console.log(key);
        this.saleData.push({ name: key, value: rel });
      }
      this.text = this.des[event];
      this.saleData = this.saleData.sort(function (a: any, b: any) {
        return b.value - a.value;
      });
      return;
    }
    for (var i = 0; i < this.data[this.time][event].length; i++) {
      var keyArray: Array<any> = Object.keys(this.data[this.time][event][i]);
      Data = this.data[this.time][event][i][keyArray[0]];
      var rel = Data[0][0] / Data[0][1];
      this.saleData.push({ name: keyArray[0], value: rel });
      this.excelData.push({"Janus":keyArray[0], "Fehleranzahl/Bewegungen":rel, "Fehleranzahl":Data[0][0], "Bewegungen":Data[0][1]})
    }
    this.text = this.des[event];
    this.saleData = this.saleData.sort(function (a: any, b: any) {
      return b.value - a.value;
    });
    this.selected3 = true
    /* old function
    this.saleData = []
    this.oldevent = event
    var Data:any;
    console.log(this.data)
    var keyArray : Array<any> = Object.keys(this.data[this.time][event][0])
    for(var i = 0; i < keyArray.length; i++){
      var Array : Array<any> = this.data[this.time][event][0][keyArray[i]]
      Data = Array.sort(function (a:any, b:any) {
        return b[0] - a[0];
      });
      var rel = Data[0][1]/Data[0][0]
      this.saleData.push({ "name":String(keyArray[i]), "value": rel})
      //this.saleData.push({ "name":"janus0644", "value": 1280},{ "name":"janus5484", "value": 2457},{ "name":"janus9678", "value": 1234})
      //console.log(this.saleData)
    }
    this.text = Data
    this.saleData = this.saleData.sort(function (a:any, b:any) {
      return a.value - b.value;
    });
    console.log(this.saleData)*/
  }

  excelData: Array<any> = [];
  saleData: Array<any> = [];

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

  ngOnInit(): void {
    this.app.display = false
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  padTo2Digits(num:any) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date : any) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  async createExcel(){
    var today = this.formatDate(new Date())
    console.log(today)
    await new Promise(f => setTimeout(f, 200));
    this.exportAsExcelFile(this.excelData,this.time + "_" + this.oldevent + "_" + today)
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    console.log(json)
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
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + EXCEL_EXTENSION
    );
  }
}
