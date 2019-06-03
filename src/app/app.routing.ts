import {Routes} from '@angular/router';
import {HomeCmpComponent} from './home-cmp/home-cmp.component';
import {HeadOnHeadCmpComponent} from './head-on-head-cmp/head-on-head-cmp.component';
import {LadderPageComponent} from './ladder-page/ladder-page.component';
import {FixturesComponent} from './fixtures/fixtures.component';
import {ResultComponent} from './result/result.component';
import {GamesNearbyComponent} from './games-nearby/games-nearby.component';

export const AppRoutes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeCmpComponent,
  },
  {
    path: 'head-on-head',
    component: HeadOnHeadCmpComponent,
  },
  {
    path: 'ladder',
    component: LadderPageComponent,
  },
  {
    path: 'fixtures',
    component: FixturesComponent,
  },
  {
    path: 'results',
    component: ResultComponent
  },
  {
    path: 'nearby',
    component : GamesNearbyComponent
  }
];


