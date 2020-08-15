import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NogiHistComponent } from './nogi-hist/nogi-hist.component';
import { NogiTvComponent } from './nogi-tv/nogi-tv.component';
import { LinkComponent } from './link/link.component';
import { NogiUranaiComponent } from './nogi-uranai/nogi-uranai.component';
import { IntroComponent } from './intro/intro.component';

const routes: Routes = [
  { path: '', component: IntroComponent},
//  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'nogi-uranai', component: NogiUranaiComponent},
  { path: 'nogi-tv', component: NogiTvComponent},
  { path: 'nogi-hist', component: NogiHistComponent},
  { path: 'link', component: LinkComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
