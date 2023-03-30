import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-prae',
  templateUrl: './admin-prae.component.html',
  styleUrls: ['./admin-prae.component.css']
})
export class AdminPraeComponent implements OnInit {
  constructor(private router: Router, private app: AppComponent) {
    if (this.app.login == false) {
      this.router.navigate(['login']);
    }
  }

  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  async ngOnInit(): Promise<void> {
    this.app.display = false
  }
}
