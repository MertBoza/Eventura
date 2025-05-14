import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'roles', pathMatch: 'full' },
      { path: 'roles', loadComponent: () => import('./roles/roles.component').then(m => m.RolesComponent) },
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);
