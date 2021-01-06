import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelplineComponent } from './helpline/helpline.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SourcesComponent } from './sources/sources.component';
import { StatewiseComponent } from './statewise/statewise.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { VaccinesComponent } from './vaccines/vaccines.component';
import { WorldwideComponent } from './worldwide/worldwide.component';

const routes: Routes = [
  {
    path:'', component: HomepageComponent
  },
  {
    path:'statistics', component: StatisticsComponent
  },
  {
    path:'statewise', component: StatewiseComponent
  },
  {
    path:'worldometer', component: WorldwideComponent
  },
  {
    path:'helpline', component: HelplineComponent
  },
  {
    path:'vaccines', component: VaccinesComponent
  },
  {
    path:'sources', component: SourcesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
