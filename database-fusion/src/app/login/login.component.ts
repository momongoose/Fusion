import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { LoginService } from '../services/login.service';
import { Router} from '@angular/router';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private app: AppComponent, private logi: LoginService, private router : Router, private error : ErrorService) {this.app.display = false}
  public showPassword: boolean = false;
  input: any;
  check: any = false;
  waiting:boolean = false;

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  async Submit() {
    //console.log(this.input);
    this.waiting = true
    await new Promise(async(resolve, reject) => {
      this.logi.login(this.input).subscribe(async (res) => {
        this.check = "true"
        if(typeof res === 'undefined'){
          this.waiting = false
          return
        } else {
          this.app.login = res
        }
        this.router.navigate(["/", "/"]);
        this.app.getMaSettings()
        if(this.app.login){
          this.getData()
        }
        resolve(this.check)
        this.app.getSettings("BreakTime")
        switch (this.app.login) {
          case 3:
            var Da = new Date();
            Da.setDate(Da.getDate() - 1);
            await this.app.getEin(Da);
            await this.delay(20)
            this.waiting =false
            break;
          case 4:
            var Da = new Date();
            Da.setDate(Da.getDate() - 1);
            await this.app.getEinAnal(Da);
            await this.delay(20)
            this.waiting =false
            break;
          case 5:
            var Da = new Date();
            Da.setDate(Da.getDate() - 1);
            await this.app.getEinPrae(Da);
            await this.delay(20)
            this.waiting =false
            break;
          default:
            this.waiting =false
            return;
        }
      });
    });
  }

  getData(){
    this.error.get_new().subscribe(async (data)=>{
      this.app.all = JSON.parse(await data)
    })
    this.error.get_old().subscribe(async (data)=>{
      this.app.old = JSON.parse(await data)
    })
  }

  goToPage(page : string){
    this.router.navigate([`${page}`]);
  }

  keyp: any;
  keyPress(event: Event) {
    this.keyp = event;
    if (this.keyp.key == 'Enter') {
      this.Submit();
    }
  }

  ngOnInit(): void {
    this.app.display = false
  }
}
