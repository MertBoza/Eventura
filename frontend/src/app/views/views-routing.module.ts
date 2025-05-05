import { RouterModule, Routes } from '@angular/router';
import { ViewsComponent } from './views.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'logging',
        loadChildren: () => import('./logging/logging.module').then(m => m.LoggingModule),
      },
      {
        path: 'homepage',
        loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule),
      },
    ],
  },
];

export const ViewsRoutingModule = RouterModule.forChild(routes);
