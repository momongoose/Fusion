import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const URL = 'http://localhost:8080/einteilungPraeanalytik/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }), //this describes the type of Data that will be send
};

@Injectable({
  providedIn: 'root'
})
export class EinteilungPraeService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getF(date: any): Observable<any> {
    return this.http.post(URL + "f", { date }, httpOptions);
  }

  getS(date: any): Observable<any> {
    return this.http.post(URL + "s", { date }, httpOptions);
  }

  getN(date: any): Observable<any> {
    return this.http.post(URL + "n", { date }, httpOptions);
  }

  inRole(role: any): Observable<any> {
    return this.http.post(URL + "role", { role }, httpOptions);
  }

  remRole(role: any): Observable<any> {
    return this.http.post(URL + "remrole", { role }, httpOptions);
  }

  inEinF(ein: any, date:any): Observable<any> {
    return this.http.post(URL + "einF", { ein, date }, httpOptions);
  }

  inEinS(ein: any, date:any): Observable<any> {
    return this.http.post(URL + "einS", { ein, date }, httpOptions);
  }

  inEinN(ein: any, date:any): Observable<any> {
    return this.http.post(URL + "einN", { ein, date }, httpOptions);
  }

  inMa(ma:any, type:any, date:any): Observable<any> {
    return this.http.post(URL + "addMA", { ma, type, date }, httpOptions);
  }

  getEinteilung(date:any): Observable<any> {
    return this.http.post(URL + "teilung", {date}, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updatePos(pos:any, pos2:any, value:any, value2:any): Observable<any> {
    return this.http.post(URL + "upPos", { pos, pos2, value, value2 }, httpOptions);
  }

  rename(value:any): Observable<any> {
    return this.http.post(URL + "ren", {value }, httpOptions);
  }

  addSet(dep:any, value:any): Observable<any> {
    return this.http.post(URL + "addBT", {dep, value}, httpOptions);
  }

  delSet(dep:any, value:any): Observable<any> {
    return this.http.post(URL + "delBT", {dep, value}, httpOptions);
  }

  getSet(sett:any, dep:any): Observable<any> {
    return this.http.post(URL + "getSet", {sett, dep}, httpOptions);
  }

  updateBreak(ma:any, date:any, brek:any): Observable<any> {
    return this.http.post(URL + "upBreak", {ma, date, brek}, httpOptions);
  }
  remEin(person:any, date:any): Observable<any> {
    return this.http.post(URL + "remEin", {person, date}, httpOptions);
  }
  getRoles(): Observable<any> {
    return this.http.get(URL + "roles", httpOptions);
  }

  getMaSettings(): Observable<any> {
    return this.http.get(URL + "MaSettings", httpOptions);
  }

  addGroup(group:any): Observable<any> {
    return this.http.post(URL + "addGroup", {group}, httpOptions);
  }
  remGroup(group:any): Observable<any> {
    return this.http.post(URL + "remGroup", {group}, httpOptions);
  }
  addSkill(skill:any, type:any, name:any): Observable<any> {
    return this.http.post(URL + "addSkill", {skill, type, name}, httpOptions);
  }
  remSkill(skill:any, name:any): Observable<any> {
    return this.http.post(URL + "remSkill", {skill, name}, httpOptions);
  }
  getGroups(): Observable<any> {
    return this.http.get(URL + "getGroups", httpOptions);
  }
  getSkills(): Observable<any> {
    return this.http.get(URL + "getSkills", httpOptions);
  }
  updateRoleGroup(role:any, group:any): Observable<any> {
    return this.http.post(URL + "upRoleGroup", {role, group}, httpOptions);
  }
  getStats(): Observable<any> {
    return this.http.get(URL + "getStats", httpOptions);
  }
  updateWish(person:any, wish:any): Observable<any> {
    return this.http.post(URL + "upWish", {person, wish}, httpOptions);
  }
}
