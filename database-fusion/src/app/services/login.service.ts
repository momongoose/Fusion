import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


const URL = 'http://localhost:8080/login/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }), //this describes the type of Data that will be send
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  errorMessage : any

  login(pas: any): Observable<any> {
    return this.http.post(URL + 'pas/', { pas }, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


 async handleError(error:any) {
  var errorMessage = error.error.text
  window.alert(errorMessage);
  return
}
}
