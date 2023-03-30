import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private app : AppComponent, private data : DatabaseService) {
    if(this.app.login == false){
      this.router.navigate(['login']);
    }
  }

  on:any = this.app.login


  ngOnInit(): void {
    this.app.display = false
    if(this.app.data == false){
      this.data.get_data().subscribe((da) => {
        this.app.data = JSON.parse(da)
      })
    }
    if(this.app.data2 == false){
      this.data.get_janus().subscribe((da) => {
        this.app.data2 = JSON.parse(da)
      })
    }
  }

}
