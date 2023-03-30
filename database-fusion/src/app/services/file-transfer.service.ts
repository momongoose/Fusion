import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:8080/einteilung/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }), //this describes the type of Data that will be send
};

@Injectable({
  providedIn: 'root'
})
export class FileTransferService {

  constructor(private http: HttpClient) { }



  SaveEinteilung(data : any): Observable<any> {
    return this.http.post(URL, { data }, httpOptions);
  }
}
