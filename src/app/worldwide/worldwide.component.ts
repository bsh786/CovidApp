import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { GoogleChartInterface } from 'ng2-google-charts';
import { HistoryIndiaDataService } from '../services/history-india-data.service';

@Component({
  selector: 'app-worldwide',
  templateUrl: './worldwide.component.html',
  styleUrls: ['./worldwide.component.css']
})
export class WorldwideComponent implements OnInit {

  constructor(
    private dataService: HistoryIndiaDataService
  ) { }

  response: any;
  countryCasesArray = [];
  mapReady = false;
  doughnutChartData: MultiDataSet;
  doughnutChartLabels: Label[];
  doughnutChartType: ChartType = 'doughnut';
  dataLoaded = false;

  public geoChart : GoogleChartInterface = {
 

    chartType: 'GeoChart',
    dataTable: [],
    options:{
      
      colorAxis: {
        colors: ['#00F919', '#0FFFE4', '#1FA20F','#156930','#033E3B']
      },
    backgroundColor: '#FFFFFF',
    datalessRegionColor: '#FFFFFF',
    defaultColor: '#FFFFFF',
    'height': 600
    
    }};


  ngOnInit(): void {

    this.dataService.getCountriesData().subscribe(
      data => {
        console.log(data);
        this.response = data;
        this.visualizeGraph();
      }
    )
  }

  visualizeGraph()
  {
      let size = this.response.length;
      this.countryCasesArray.push(['Country','Cases']);

      for(let i=0;i<size;i++)
      {
        if(this.response[i].country === 'USA')
        {
          this.response[i].country = 'US'; 
        }
        if(this.response[i].country === 'UK')
        {
          this.response[i].country = 'United Kingdom';
        }
        if(this.response[i].country === 'Libyan Arab Jamahiriya')
        {
          this.response[i].country = 'Libya';
        }
        if(this.response[i].country === 'DRC')
        {
          this.response[i].country = 'CD';
        }
        if(this.response[i].country === 'Congo')
        {
          this.response[i].country = 'Cg';
        }
        if(this.response[i].country === "Côte d'Ivoire")
        {
          this.response[i].country = 'Ivory coast'
        }
        if(this.response[i].country === 'South Sudan')
        {
          this.response[i].country = 'SS';
        }

        let countryCaseObject = [this.response[i].country, this.response[i].cases];
        this.countryCasesArray.push(countryCaseObject);
      }

      console.log(this.countryCasesArray);
      this.geoChart.dataTable = this.countryCasesArray;
      this.mapReady = true;
  }

  public createGraph(i:number)
  {
    this.dataLoaded = false;
    this.doughnutChartLabels = ['active', 'recovered','deaths']
    this.doughnutChartData = [ [this.response[i].active, this.response[i].recovered,this.response[i].deaths]];
    this.dataLoaded = true;
  }

  public deleteGraph()
  {
    this.dataLoaded = false;
  }




  
}
