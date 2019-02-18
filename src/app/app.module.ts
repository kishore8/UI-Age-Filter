import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {MatChipsModule,MatInputModule,MatFormFieldModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  exports:[
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
