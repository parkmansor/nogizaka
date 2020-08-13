import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NogiHistComponent } from './nogi-hist/nogi-hist.component';
import { NogiTvComponent } from './nogi-tv/nogi-tv.component';
import { NogiFortuneComponent } from './nogi-fortune/nogi-fortune.component';
import { LinkComponent } from './link/link.component';

const routes: Routes = [
  { path: '', redirectTo: '/nogi-tv', pathMatch: 'full'},
  { path: 'nogi-tv', component: NogiTvComponent},
  { path: 'nogi-fortune', component: NogiFortuneComponent},
  { path: 'nogi-hist', component: NogiHistComponent},
  { path: 'link', component: LinkComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
