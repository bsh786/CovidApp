import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class LatestDataIndiaServiceService {

  constructor(private http: HttpClient) { }


  getData()
  {
    return this.http.get<any>('https://api.rootnet.in/covid19-in/stats/latest');
    
  }

  getHelplineNos()
  {
    return this.http.get<any>('https://api.rootnet.in/covid19-in/contacts');
  }

  getlastThirtyDaysData()
  {
    return this.http.get<any>
    ('https://disease.sh/v3/covid-19/historical/india?lastdays=15');
  }
}
