import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NogiTvComponent } from './nogi-tv/nogi-tv.component';
import { NogiHistComponent } from './nogi-hist/nogi-hist.component';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { LinkComponent } from './link/link.component';
import { NogiUranaiComponent } from './nogi-uranai/nogi-uranai.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntroComponent } from './intro/intro.component';

@NgModule({
  declarations: [
    AppComponent,
    NogiTvComponent,
    NogiHistComponent,
    LinkComponent,
    NogiUranaiComponent,
    IntroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
