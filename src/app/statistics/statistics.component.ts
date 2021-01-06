import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HistoryIndiaDataService} from '../services/history-india-data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit {

  constructor(private dataIndiaService: HistoryIndiaDataService,
    private datePipe: DatePipe) { }

  
   indianDataArray = [];
   worldCasesData: any;
   worldDeathsData: any;
   worldRecoveredData: any;
   worldCasesDataArray  = [];
   worldDeathsDataArray = [];
   worldRecoveredDataArray = [];
   worldDatesDataArray = [];
   worldActiveCasesDataArray = [];
   lastFifteenPoints = [];
   lastFifteenPointsTotalCases = [];
   lastFifteenPointsActiveCases = [];
   lastFifteenPointsRecoveries = [];
   lastFifteenPointsDeaths = [];
   dataLoaded: boolean = false;
   finalDataLoaded : boolean = false;
   myDate = new Date();
   dateToday:string;
   arraySize = 0;
   countryWiseCases = [];
   dateLabels = [];
   deathsLineChartData: ChartDataSets[];
   activeCasesLineChartData: ChartDataSets[];
   dischargedLineChartData: ChartDataSets[];
   lineChartData: ChartDataSets[];
   worldDeathsLineChartData:ChartDataSets[];
   worldActiveCasesLineChartData: ChartDataSets[];
   worldCasesLineChartData: ChartDataSets[];
   worldRecoveredLineChartData: ChartDataSets[];
   worldChartLabels : Label[];
   regionalData:any;
   maxCasesCountryValue = [];
   maxCasesCountryName = [];
   maxCasesStatesValue = [];
   maxCasesStatesName = [];
   statesBarChartLabels: Label[];
   statesBarChartData: ChartDataSets[];
   countriesBarChartLabels: Label[];
   countriesBarChartData: ChartDataSets[];
   barChartType : ChartType = 'bar';
   barChartLegend = true;
   barChartPlugins = [];



   barChartOptions: ChartOptions = {
     responsive: true
   }

   activeLineChartColors:Color[]=
   [
     {
       borderColor: '#0033cc',
       backgroundColor:'#e6ecff' 
     }
   ]

   deathLineChartColors:Color[]=
   [
     {
       borderColor: '#e60000',
       backgroundColor: '#ffe6e6'   
     }
   ]

   recoveredLineChartColors:Color[]=
   [
     {
       borderColor: '#29a329',
       backgroundColor: '#ebfaeb'
     }
   ]

   
   lineChartOptions = {
     responsive: true
   };

   lineChartLabels : Label[];
   lineChartColors: Color[] = [
    {
      borderColor:'#e67300',
      backgroundColor: '#fff2e6' 

    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


    ngOnInit(): void {
    
     this.loadIndianHistoricalData();
    
    
  }

  loadIndianHistoricalData()
  {
    this.dataIndiaService.getData().subscribe(
      data => {
       console.log(data);

       if(data.success === true)
       {
        
         this.arraySize = data.data.length;

         for(let i=0;i<this.arraySize;i++)
         {
           this.indianDataArray.push(data.data[i]);
         }
        
       }
       this.totalCasesGraph();
      }
    )}
 

 totalCasesGraph()
 {
    
    let counter = 0;
    let startPoint = this.arraySize - 15*10;
    while(counter<15)
    {
      this.lastFifteenPoints.push(this.indianDataArray[startPoint]);
      this.lastFifteenPointsTotalCases.push(this.indianDataArray[startPoint].summary.total);
      this.dateLabels.push(this.indianDataArray[startPoint].day);
      startPoint = startPoint+10;
      counter++;
    }

    // console.log(this.indianDataArray);
    // console.log('A : '+this.dateLabels[14]);
    // console.log('B : '+this.indianDataArray[this.arraySize-1].day);

    if(this.dateLabels[14] != this.indianDataArray[this.arraySize-1].day)
    {
       this.lastFifteenPointsTotalCases.push(this.indianDataArray[this.arraySize-1]
        .summary.total);
       this.lastFifteenPoints.push(this.indianDataArray[this.arraySize-1]);
       this.dateLabels.push(this.indianDataArray[this.arraySize-1].day);
       
    }


   
    this.lineChartData = [
      {
        data: this.lastFifteenPointsTotalCases, label: 'Total Cases'
      }
    ];
   
    this.lineChartLabels = this.dateLabels;
    this.totalIndiaActiveCases();
 }

 totalIndiaActiveCases()
 {

   for( let i=0;i<this.lastFifteenPoints.length;i++)
   {
   let activeCasesValue = this.lastFifteenPoints[i].summary.total - 
                          this.lastFifteenPoints[i].summary.deaths-
                          this.lastFifteenPoints[i].summary.discharged;
   this.lastFifteenPointsActiveCases.push(activeCasesValue);    
   this.lastFifteenPointsDeaths.push(this.lastFifteenPoints[i].summary.deaths); 
   this.lastFifteenPointsRecoveries.push(this.lastFifteenPoints[i].summary.discharged); 
                     
   }
   
   this.activeCasesLineChartData = [
     {
       data:this.lastFifteenPointsActiveCases, label: 'Active Cases'
     }
   ];

   this.deathsLineChartData = [
     {
       data:this.lastFifteenPointsDeaths, label:'Deaths'
     }
   ]

   this.dischargedLineChartData = [
     {
       data:this.lastFifteenPointsRecoveries, label:'Recoveries'
     }
   ]
    
   this.getTotalWorldCases();
   
 }

 getTotalWorldCases()
 {
  
  this.dataIndiaService.getWorldData().subscribe(
    data => {
      console.log(data);
      this.worldCasesData = data.cases;
      this.worldDeathsData = data.deaths;
      this.worldRecoveredData = data.recovered;
    //  console.log(this.worldData);
      this.visualizeWorldCases();
    }
  );
  

}

visualizeWorldCases()
{
  // console.clear();
  // console.log('Hello Brother');
  //  console.log(this.worldCasesData);
  //  console.log(this.worldDeathsData);
  //  console.log(this.worldRecoveredData);
  
 // let keys = Object.keys(this.worldData);
  //console.log(keys);
  
  // for(let keys in this.worldData)
  // {
  //   console.log(keys+ ' '+this.worldData[keys]);
  // }
  
  this.myDate.setDate(this.myDate.getDate()-151);
 /// console.log(this.myDate);

  for(let i=0;i<15;i++)
  {
    this.myDate.setDate(this.myDate.getDate() + 10);
   // console.log(this.myDate);
    let month = this.myDate.getMonth()+1;
    let date = this.myDate.getDate();

    // console.log(month);
    // console.log(date);

    if(month < 10)
    {
       if(date<10)
       {
        this.dateToday = this.datePipe.transform(this.myDate, 'M/d/yy');
       }
       else if(date>=10)
       {
         this.dateToday = this.datePipe.transform(this.myDate, 'M/dd/yy');
       }
    }
    else{

      if(date<10)
      {
        this.dateToday = this.datePipe.transform(this.myDate, 'MM/d/yy');
      }
      else if(date>=10)
      {
        this.dateToday = this.datePipe.transform(this.myDate, 'MM/dd/yy');
      }
    }
      // console.log(this.dateToday);
      // console.log(this.worldCasesData[this.dateToday]);
      this.worldCasesDataArray.push(this.worldCasesData[this.dateToday]);
      this.worldRecoveredDataArray.push(this.worldRecoveredData[this.dateToday]);
      this.worldDeathsDataArray.push(this.worldDeathsData[this.dateToday]);
      this.worldDatesDataArray.push(this.dateToday);
    }

    for(let i=0;i<15;i++)
    {
      let activeCase = this.worldCasesDataArray[i] - this.worldRecoveredDataArray[i]
                       -this.worldDeathsDataArray[i];
       this.worldActiveCasesDataArray.push(activeCase);                
    }

    // console.log(this.worldCasesDataArray);
    // console.log(this.worldRecoveredDataArray);
    // console.log(this.worldDeathsDataArray);
    // console.log(this.worldDatesDataArray);
    // console.log(this.worldActiveCasesDataArray);
  
  this.worldCasesLineChartData = [
    {
      data: this.worldCasesDataArray, label:'Total Cases'
    }
  ]; 

  this.worldActiveCasesLineChartData = [
    {
      data: this.worldActiveCasesDataArray, label:'Active Cases'
    }
  ]

  this.worldRecoveredLineChartData = [
    {
      data: this.worldRecoveredDataArray, label: 'Recovered'
    }
  ]

  this.worldDeathsLineChartData = [
    {
      data: this.worldDeathsDataArray, label: 'Deaths'
    }
  ]

  this.worldChartLabels = this.worldDatesDataArray;
  this.visualizeStateBarGraphs();

}

visualizeStateBarGraphs()
{

 //  console.log(this.indianDataArray);
   let size = this.indianDataArray.length;
   console.log(size);
   this.regionalData = this.indianDataArray[size-1].regional;
  //  console.log('Regional Data: ');
  //  console.log(this.regionalData);

   this.regionalData.sort((a,b)=> (a.totalConfirmed < b.totalConfirmed) ? 1:-1);

   for(let i=0;i<10;i++)
   {
     this.maxCasesStatesName.push(this.regionalData[i].loc);
     this.maxCasesStatesValue.push(this.regionalData[i].confirmedCasesIndian);
   }

  //  console.log(this.maxCasesStatesName);
  //  console.log(this.maxCasesStatesValue);

   this.statesBarChartLabels = this.maxCasesStatesName;
   this.statesBarChartData = [
     {
       data: this.maxCasesStatesValue, label: 'Total Cases'
     }
   ]


 this.getCountryBarGraphsData();
}

getCountryBarGraphsData()
{
   this.dataLoaded = false;
   this.dataIndiaService.getCountriesData()
   .subscribe(
     data => {
      
      // console.log(data);
       this.countryWiseCases = data;
     //  console.log('Country Wise Cases: ');
      // console.log(this.countryWiseCases);
       
       this.virtualizeCountryBarGraphs();
     }
   );

     
}

virtualizeCountryBarGraphs()
{
  
    this.countryWiseCases.sort((a,b) => (a.cases < b.cases) ? 1 : -1);
  

  console.log(this.countryWiseCases);
  for(let i=0;i<10;i++)
  {
    this.maxCasesCountryName.push(this.countryWiseCases[i].country);
    this.maxCasesCountryValue.push(this.countryWiseCases[i].cases);
  }

  console.log(this.maxCasesCountryName);
  console.log(this.maxCasesCountryValue);
  this.countriesBarChartData = [{
    data: this.maxCasesCountryValue, label: 'Total Cases'
  }];

  this.countriesBarChartLabels = this.maxCasesCountryName;
  this.finalDataLoaded = true;

}


}