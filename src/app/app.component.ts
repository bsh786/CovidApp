import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LatestDataIndiaServiceService } from './services/latest-data-india-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'covid-app';

  constructor(private router: Router){}

  ngOnInit()
  {
    this.router.events.subscribe((evt) => {
      
      if(!(evt instanceof NavigationEnd))
      {
        return;
      }
      window.scrollTo(0,0);
    })
  }
}
