import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng2GoogleChartsModule } from 'ng2-google-charts'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { StatisticsComponent } from './statistics/statistics.component';
import { DatePipe } from '@angular/common';
import { StatewiseComponent } from './statewise/statewise.component';
import { WorldwideComponent } from './worldwide/worldwide.component';
import { HelplineComponent } from './helpline/helpline.component';
import { VaccinesComponent } from './vaccines/vaccines.component';
import { SourcesComponent } from './sources/sources.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    StatisticsComponent,
    StatewiseComponent,
    WorldwideComponent,
    HelplineComponent,
    VaccinesComponent,
    SourcesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ChartsModule,
    HttpClientModule,
    Ng2GoogleChartsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
