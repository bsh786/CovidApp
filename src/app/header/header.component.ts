import { Component, OnInit } from '@angular/core';
import { faChartArea, faChartLine, faFlag, faGlobe, faGlobeAfrica, faGlobeAmericas, faGlobeAsia, faHome, faVirus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faVirus = faVirus;
  faHome = faHome;
  faFlag = faFlag;
  faGlobe = faGlobeAmericas;
  faChartArea = faChartLine;


  constructor() { }

  ngOnInit(): void {
  }

}
