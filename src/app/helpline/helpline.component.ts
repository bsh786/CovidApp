import { Component, OnInit } from '@angular/core';
import { faEnvelope, faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { LatestDataIndiaServiceService } from '../services/latest-data-india-service.service';

@Component({
  selector: 'app-helpline',
  templateUrl: './helpline.component.html',
  styleUrls: ['./helpline.component.css']
})
export class HelplineComponent implements OnInit {

  constructor(private dataService: LatestDataIndiaServiceService) { }

  primary:any;
  statewise = [];
  faPhone = faPhoneSquareAlt;
  faEmail = faEnvelope;
  phone:string;
  email:string;
  facebook:string;
  tollFree:number;
  twitter:string;
  dataLoaded = false;

  ngOnInit(): void {

     this.dataService.getHelplineNos().subscribe(
      data => {
        if(data.success == true)
        {
         console.log(data);
        this.primary = data.data.contacts.primary;
        this.statewise = data.data.contacts.regional;
        console.log(this.primary);
        console.log(this.statewise);
        this.loadData();
        
        }
      }
    )
  }

  loadData()
  {
    this.phone = this.primary.number;
    this.tollFree = this.primary['number-tollfree'];
    this.email = this.primary.email;
    this.facebook = this.primary.facebook;
    this.twitter = this.primary.twitter;
    console.log(this.tollFree);
    this.dataLoaded = true;
  }

 

}
