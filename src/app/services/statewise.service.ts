import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatewiseService {

  constructor(public http: HttpClient) { }

  getData(): Observable<Data>
  {
    return this.http.get<Data>('https://api.covid19india.org/data.json');
  }
}
