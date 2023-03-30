import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:8080/error/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }), //this describes the type of Data that will be send
};

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private http: HttpClient) { }

  get_new(): Observable<any> {
    return this.http.get(URL + "new", {
      responseType: 'text',
    });
  }

  get_old(): Observable<any> {
    return this.http.get(URL + "old", {
      responseType: 'text',
    });
  }

  update(sample: any): Observable<any> {
    return this.http.post(URL + "update", { sample }, httpOptions);
  }
}
