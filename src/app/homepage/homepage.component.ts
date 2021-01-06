import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { faAmbulance, faChartLine, faGlobeAmericas, faClinicMedical } from '@fortawesome/free-solid-svg-icons';
import { LatestDataIndiaServiceService } from '../services/latest-data-india-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private dataService: LatestDataIndiaServiceService,
    private router: Router,
    private datePipe: DatePipe) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  faChartLine = faChartLine;
  faAmbulance = faClinicMedical;
  faGlobe = faGlobeAmericas;
  totalCases = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActiveCases = 0;
  dataReceived = false;
  public pieChartData: SingleDataSet;
  newCasesLineChartData: ChartDataSets[];
  newCasesLineChartLabels: Label[];
  todayDeathsLineChartData: ChartDataSets[];
  todayDeathsLineChartLabels: Label[];
  todayRecoveredLineChartData: ChartDataSets[];
  todayRecoveredLineChartLabels: Label[];
  lastFifteenDaysData: any;
  dateToday = new Date();
  previousDate = new Date();
  myDate: string;
  datesArray = [];
  newCasesArray = [];
  newDeathsArray = [];
  newRecoveredArray = [];
  lineChartDataReady = false;
  lineGraphSelected = 1;
  newCases: number;
  newDeaths: number;
  newRecovered:number;

  lineChartOptions = {
    responsive: true
  };

  lineChartColors: Color[] = [
    {
      borderColor:'black',
      backgroundColor: 'rgba(255,255,0,0.28)'
    }
  ];

  newCasesLineChartColors: Color[] = [
    {
      borderColor: '#3333ff',
      backgroundColor: 'rgba(51,51,255,0.5)'
    }
  ]

  recoveredLineChartColors: Color[] = [
    {
      borderColor: '#00CC00',
      backgroundColor: 'rgba(0,255,0,0.35)'
    }
  ]

  deathLineChartColors: Color[] = [
    {
      borderColor: '#ff0000',
      backgroundColor: 'rgba(255,0,0,0.4)'
    }
  ]


  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  ngOnInit(): void {    
   
    this.fetchData();
  }

  private fetchData()
  {
     this.dataService.getData().subscribe(
       data=>{
         if(data.success === true)
         {
         //  console.log('Success');
           console.log(data);
           this.totalCases = data.data.summary.total;
           this.totalDeaths = data.data.summary.deaths;
           this.totalRecovered = data.data.summary.discharged;
        //   console.log('Total Cases: '+this.totalCases);
        //   console.log('Total Deaths: '+this.totalDeaths);
        //   console.log('Total Recovered: '+this.totalRecovered);
           this.totalActiveCases = this.totalCases-this.totalRecovered-this.totalDeaths;
        //   console.log('Total Active: '+this.totalActiveCases);
           
           this.pieChartData = [this.totalActiveCases, this.totalRecovered , this.totalDeaths];
           this.dataReceived = true;
          }
       }
     );

     this.dataService.getlastThirtyDaysData().subscribe(
       data =>{
         console.log(data);
         this.lastFifteenDaysData = data;
         this.generateGraphs();
       }
     );
  }
    public pieChartOptions: ChartOptions = {
      responsive: true
    };

    public pieChartLabels: Label[] = [ 'Total Active','Total Recovered', 'Deaths'];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];
    


   generateGraphs()
   {
     this.dateToday.setDate(this.dateToday.getDate()-1);
     console.log(this.dateToday);

     for(let i=0;i<10;i++)
     {
      
      this.previousDate.setDate(this.dateToday.getDate()-1);
      let dateString: string;
      let previousDateString: string;
      dateString = this.getDateString(this.dateToday);
      previousDateString = this.getDateString(this.previousDate);
 //     console.log('This Date: '+dateString);
 //     console.log(' Previous Date: '+previousDateString);

      let casesOnThisDate = this.lastFifteenDaysData.timeline
                            .cases[dateString]; 
  //    console.log('Cases on this date: '+casesOnThisDate);

      let casesOnPreviousDate = this.lastFifteenDaysData.timeline
                                .cases[previousDateString];
 //     console.log('Cases on previous date:'+ casesOnPreviousDate);                          
      let newCases = casesOnThisDate - casesOnPreviousDate;
  //    console.log('New Cases: '+newCases);

      let deathsOnThisDate = this.lastFifteenDaysData.timeline
                             .deaths[dateString];
  //    console.log('Deaths on this date: '+deathsOnThisDate);

      let deathsOnPreviousDate = this.lastFifteenDaysData.timeline
                                .deaths[previousDateString];
 //     console.log('Deaths on previous date: '+deathsOnPreviousDate);
      
      let newDeaths = deathsOnThisDate - deathsOnPreviousDate;
 //     console.log('New Deaths: '+newDeaths);

      let recoveriesOnThisDate = this.lastFifteenDaysData.timeline
                                 .recovered[dateString];
 //     console.log('Recoveries on this date: '+recoveriesOnThisDate);
      
      let recoveriesOnPreviousDate = this.lastFifteenDaysData.timeline
                                     .recovered[previousDateString];
  //    console.log('Recoveries on previous date: '+recoveriesOnPreviousDate);
      
      let newRecoveries = recoveriesOnThisDate - recoveriesOnPreviousDate;

     // console.log('New Recoveries: '+newRecoveries);
      
      this.datesArray.push(dateString);
      this.newCasesArray.push(newCases);
      this.newRecoveredArray.push(newRecoveries);
      this.newDeathsArray.push(newDeaths);
      


      this.dateToday.setDate(this.dateToday.getDate()-1);
       
     }

    //  console.log(this.datesArray);
    //  console.log(this.newCasesArray);
    //  console.log(this.newDeathsArray);
    //  console.log(this.newRecoveredArray);

     console.log('Reversed Arrays are: ');

     this.datesArray = this.datesArray.reverse();
     this.newCasesArray = this.newCasesArray.reverse();
     this.newDeathsArray = this.newDeathsArray.reverse();
     this.newRecoveredArray = this.newRecoveredArray.reverse();

    //  console.log(this.datesArray);
    //  console.log(this.newCasesArray);
    //  console.log(this.newDeathsArray);
    //  console.log(this.newRecoveredArray);
    
    this.newCasesLineChartData = [
      {
        data: this.newCasesArray, label: 'New Cases'
      }
    ];

    this.newCasesLineChartLabels = this.datesArray;

    this.todayDeathsLineChartData = [
      {
        data: this.newDeathsArray, label:'Last 24 hours Deaths '
      }
    ];

    this.todayDeathsLineChartLabels = this.datesArray;
    this.todayRecoveredLineChartLabels = this.datesArray;

    this.todayRecoveredLineChartData = [
      {
        data: this.newRecoveredArray, label:'Last 24 hours Recoveries'
      }
    ];
    

   if(this.newCasesArray[this.newCasesArray.length-1])
   { 
     this.newCases = this.newCasesArray[this.newCasesArray.length-1];
   }
   else
   {
    this.newCases = this.newCasesArray[this.newCasesArray.length-2];
   } 
   
   if(this.newRecoveredArray[this.newRecoveredArray.length-1])
   {
    this.newRecovered = this.newRecoveredArray[this.newRecoveredArray.length-1];
   }
   else{
    this.newRecovered = this.newRecoveredArray[this.newRecoveredArray.length-2];
   }

   if(this.newDeathsArray[this.newDeathsArray.length-1])
   {     
    this.newDeaths = this.newDeathsArray[this.newDeathsArray.length-1];
   }
   else{
    this.newDeaths = this.newDeathsArray[this.newDeathsArray.length-2];
   }
  console.log(this.newCasesArray);

   console.log('New Cases: '+this.newCases);
   console.log('New Recovered: '+this.newRecovered);
   console.log('New Deaths: '+this.newDeaths);
   
   this.lineChartDataReady= true;  
  }
  
  
  getDateString(fullDate: Date): string
   {
      let month = fullDate.getMonth();
      month = month + 1;
      let exactDate = fullDate.getDate();
      let dateString = '';
      if(month<10)
      {
         if(exactDate<10)
         {
              dateString = this.datePipe.transform(fullDate,'M/d/yy'); 
         }
         else if(exactDate>=10)
         {
             dateString = this.datePipe.transform(fullDate,'M/dd/yy');
         }
      }
      else if(month >= 10)
      {
       if(exactDate<10)
       {
           dateString = this.datePipe.transform(fullDate,'MM/d/yy');
       }
       else if(exactDate>=10)
       {
           dateString = this.datePipe.transform(fullDate,'MM/dd/yy');
       }
      }
 
     return dateString;
   }

   onClickStatistics()
   {
     console.log('Statistics was clicked');
     this.router.navigate(['/statistics']);
   }

   onClickStatewise()
   {
     this.router.navigate(['/statewise']);
   }

   onClickWorldometer()
   {
     this.router.navigate(['/worldometer']);
   }

   onClickHelpline()
   {
     this.router.navigate(['/helpline']);

   }

   onClickVaccines()
   {
     this.router.navigate(['/vaccines']);
   }

   onClickSources()
   {
     this.router.navigate(['/sources']);
   }

   onClickNewCases()
   {
     this.lineGraphSelected = 1;
   }

   onClickNewDeaths()
   {
     this.lineGraphSelected = 3;
   }

   onClickNewRecoveries()
   {
     this.lineGraphSelected = 2;
   }
}
