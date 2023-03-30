import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { ErrorService } from '../services/error.service';

export interface UserData {
  id: number;
  name: string;
}

var ArrayAll : any;

@Component({
  selector: 'app-error-check',
  templateUrl: './error-check.component.html',
  styleUrls: ['./error-check.component.css']
})
export class ErrorCheckComponent implements OnInit {

  constructor(private app: AppComponent, private router : Router, private error : ErrorService) {
    if(this.app.login == false){
      this.router.navigate(['login']);
    }
    ArrayAll = this.app.old
    const users = Array.from({length: ArrayAll.length}, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

   displayedColumns: string[] = ['name'];
    dataSource: MatTableDataSource<UserData> = new MatTableDataSource;

    async ngOnInit(){
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.app.display = false
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }


  Datas = this.app.all

    async up(){
      for(var i = 0; i < this.Datas.length; i++){
        if(this.Datas[i].checked == true){
          var sample = this.Datas[i].name.substring(
            this.Datas[i].name.indexOf("'") + 1,
            this.Datas[i].name.lastIndexOf("'")
          );
          [...this.Datas.splice(i, 1)]
          this.error.update(sample).subscribe((data)=>{
            console.log(data)
          })
        }
      }
      await new Promise(f => setTimeout(f, 100));
    }

  async check(){
    for(var i = 0; i < this.Datas.length; i++){
      if(this.Datas[i].checked == true){
        var sample = this.Datas[i].name.substring(
          this.Datas[i].name.indexOf("'") + 1,
          this.Datas[i].name.lastIndexOf("'")
        );
        this.error.update(sample).subscribe((data)=>{
          console.log(data)
        })
      }
    }
    await new Promise(f => setTimeout(f, 100));
    this.error.get_new().subscribe(async (data)=>{
      this.app.all = JSON.parse(await data)
      this.Datas = [...this.app.all];
    })
    this.error.get_old().subscribe(async (data)=>{
      this.app.old = JSON.parse(await data)
      ArrayAll = [...this.app.old];
    })
    await new Promise(f => setTimeout(f, 100));
    const users = Array.from({length: ArrayAll.length}, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  /** Builds and returns a new User. */
  function createNewUser(id: number): UserData {
    if(ArrayAll.length >= id){
      return {
        id: id,
        name: ArrayAll[id-1].name,
      };
    } else {
      return {
        id: id,
        name: ArrayAll[(id-ArrayAll.length)-1].name
      }
    }

  }
