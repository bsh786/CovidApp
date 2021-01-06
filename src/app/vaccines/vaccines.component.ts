import { Component, OnInit } from '@angular/core';
import { HistoryIndiaDataService } from '../services/history-india-data.service';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.css']
})
export class VaccinesComponent implements OnInit {

  constructor(private dataService: HistoryIndiaDataService) { }

  dataLoaded = false;
  vaccineData: any;
  totalCandidates: number;
  phaseData = [];
  vaccines = [];
  phaseWiseVaccines = [];
  phaseSelected = false;
  selectedPhase = '';
  vaccinesInSelectedPhase = [];
  vaccineSelected = false;
  selectedVaccine: any;
  objectKeys =  Object.keys;
   

  ngOnInit(): void {

    this.dataService.getVaccineData().subscribe(
      data => {
        console.log(data);
        this.vaccineData = data;
        this.loadVaccineData();
      }
    )
  }

  loadVaccineData()
  {
    this.totalCandidates = this.vaccineData.totalCandidates; 
    this.phaseData = this.vaccineData.phases;
    this.vaccines = this.vaccineData.data;

    let noOfPhases = this.phaseData.length;
    let noOfVaccines = this.vaccines.length;

    
    
    for(let i=0;i<noOfPhases;i++)
    {
      let vaccines = [];
      
      for(let j=0;j<noOfVaccines;j++)
      {
        if(this.vaccines[j].trialPhase === this.phaseData[i].phase)
        {
          vaccines.push(this.vaccines[j]);
        }
      }
      
      let phase = {
        phaseNo: this.phaseData[i].phase,
        vaccines: [] = vaccines
      };

      
      this.phaseWiseVaccines.push(phase);
      

    }

    console.log('Full Phase Wise: ');
    console.log(this.phaseWiseVaccines);
    this.dataLoaded = true;
  }


  selectPhase(i:number)
  {
     
    this.selectedPhase = this.phaseWiseVaccines[i].phaseNo;
    this.vaccinesInSelectedPhase = this.phaseWiseVaccines[i].vaccines;
    this.phaseSelected = true;
  
  }

  selectVaccine(j:number)
  {
    
    console.log(j);
    this.selectedVaccine = this.vaccinesInSelectedPhase[j];
    console.log(this.selectedVaccine);
    this.vaccineSelected = true;

  }


}
