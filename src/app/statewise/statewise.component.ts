import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { GoogleChartInterface } from 'ng2-google-charts';
import { StatewiseService } from '../services/statewise.service';

@Component({
  selector: 'app-statewise',
  templateUrl: './statewise.component.html',
  styleUrls: ['./statewise.component.css']
})
export class StatewiseComponent implements OnInit {

  states_data = [['State','COVID-Confirmed Cases']];
  response: any[]=[];
  mapReady=false;
  doughnutChartData: MultiDataSet;
  doughnutChartLabels: Label[];
  doughnutChartType: ChartType = 'doughnut';
  dataLoaded = false;

  constructor(public serv: StatewiseService) { }

  ngOnInit(): void {
    this.serv.getData().subscribe((res)=>{
      this.response=res.statewise;
      this.response.splice(0,1);
      console.log(this.response);

      for(let state of this.response){
        let temp = [state.state,Number(state.confirmed)];
        if( state.state=="Odisha"){
          temp = ['IN-OR',Number(state.confirmed)];
        }
        this.states_data.push(temp);
      }
      this.mapReady=true
    },
    (err)=>{
      console.log(err)
    }
  );
  }

  public geoChart: GoogleChartInterface = {
    chartType: 'GeoChart',
    dataTable: this.states_data,
    options: {
      region: 'IN', // INDIA
      colorAxis: {colors: ['#00F919', '#0FFFE4', '#1FA20F','#156930','#033E3B']},
      resolution: 'provinces',
      backgroundColor: '#00000',
      datalessRegionColor: '#00000',
      defaultColor: '#00000',
      'height': 600,
    }
  };

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
