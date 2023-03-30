import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:8080/database/';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  get_data(): Observable<any> {
    return this.http.get(URL + "janus", {
      responseType: 'text',
    });
  }

  get_janus(): Observable<any> {
    return this.http.get(URL + "janus/info", {
      responseType: 'text',
    });
  }
}
