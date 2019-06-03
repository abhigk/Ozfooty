import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderCmpComponent } from './header-cmp/header-cmp.component';
import {SidebarCmpComponent} from './sidebar-cmp/sidebar-cmp.component';
import { HomeCmpComponent } from './home-cmp/home-cmp.component';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app.routing';
import { HeadOnHeadCmpComponent } from './head-on-head-cmp/head-on-head-cmp.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { NewsHealinesComponent } from './news-healines/news-healines.component';
import { DataService } from './services/data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LadderComponent } from './home-cmp/ladder/ladder.component';
import { LadderPageComponent } from './ladder-page/ladder-page.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { ResultComponent } from './result/result.component';
import { GamesNearbyComponent } from './games-nearby/games-nearby.component';
import { TopPlayersComponent } from './top-players/top-players.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderCmpComponent,
    SidebarCmpComponent,
    HomeCmpComponent,
    HeadOnHeadCmpComponent,
    NewsHealinesComponent,
    LadderComponent,
    LadderPageComponent,
    FixturesComponent,
    ResultComponent,
    GamesNearbyComponent,
    TopPlayersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(AppRoutes),
    SelectDropDownModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
