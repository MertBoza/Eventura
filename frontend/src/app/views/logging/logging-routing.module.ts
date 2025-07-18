import { RouterModule, Routes } from '@angular/router';
import { LoggingComponent } from './logging.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: LoggingComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' }, 
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]
  }
];

export const LoggingRoutingModule = RouterModule.forChild(routes);
