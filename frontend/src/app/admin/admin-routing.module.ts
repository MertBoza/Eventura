import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'roles', loadComponent: () => import('./roles/roles.component').then(m => m.RolesComponent) },
      { path: 'category', loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent) },
      { path: 'events', loadComponent: () => import('./events/events.component').then(m => m.EventsComponent) },
      { path: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
      { path: 'tickets', loadComponent: () => import('./tickets/tickets.component').then(m => m.TicketsComponent) },
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);
