import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'




@Injectable({
  providedIn: 'root'
})
export class HistoryIndiaDataService {

  constructor(private http: HttpClient) { }

  getData()
  {
    return this.http.get<any>('https://api.rootnet.in/covid19-in/stats/history');
  }

  getWorldData()
  {
     return this.http.get<any>
     ('https://disease.sh/v3/covid-19/historical/all?lastdays=150');
    
  }

  getCountriesData()
  {
    return this.http.get<any>
    ('https://disease.sh/v3/covid-19/countries');
  }

  getVaccineData()
  {
    return this.http.get<any>
    ('https://disease.sh/v3/covid-19/vaccine');
  }
}
