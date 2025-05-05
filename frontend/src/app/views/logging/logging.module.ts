import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoggingRoutingModule } from './logging-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoggingComponent } from './logging.component';

// Import LoggingComponent as a standalone component

@NgModule({
  // No need to declare LoggingComponent in the 'declarations' array
  declarations: [
    // LoggingComponent is not declared here as it is a standalone component
  ],
  imports: [
    CommonModule,
    LoggingRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LoggingComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class LoggingModule {}
