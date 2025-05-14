import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, RouterModule, HttpClientModule], 
})
export class AppModule {}
