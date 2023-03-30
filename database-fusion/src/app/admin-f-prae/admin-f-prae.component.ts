import { Component, AfterViewInit, ViewChild, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { EinteilungPraeService } from '../services/einteilung-prae.service';

@Component({
  selector: 'app-admin-f-prae',
  templateUrl: './admin-f-prae.component.html',
  styleUrls: ['./admin-f-prae.component.css']
})
export class AdminFPraeComponent implements OnInit {
  constructor(private app : AppComponent, private ein : EinteilungPraeService) {
    //if (this.app.login == false) {
    //  this.router.navigate(['login']);
    //}
    this.update()
  }

  einteilung:any = this.app.einteilungF;
  connectedTo:any = this.app.connectedToF;
  pre = '';
  now = '';
  urlaub = ""
  krank = ""

  update(){
    setInterval(()=>{
      this.einteilung = this.app.einteilungF;
      this.connectedTo = this.app.connectedToF
      for(var f = 0; f < this.einteilung.length; f++){
        if(this.einteilung[f].list.length < 2){
          this.einteilung[f].list.push({name:"", state: ""},{name:"", state: ""})
        }
      }
    }, 1000)
  }

  send : boolean = false;
  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  async submit(){
    this.ein.inEinF(this.einteilung, this.app.date).subscribe((data)=>{
      return data
    })
    this.send = true;
    await this.delay(4000)
    this.send = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.pre = event.previousContainer.id;
    this.now = event.container.id;
    if(this.now == this.pre) {
      return
    }
    /*if(event.container.data[event.currentIndex] !== "") {

      console.log("added " + this.now + " | "  + event.container.data[event.currentIndex]);
      console.log("removed " + this.pre + " | " + event.container.data[event.currentIndex])
    }*/
  }

  ngOnInit(): void {
  }
}
