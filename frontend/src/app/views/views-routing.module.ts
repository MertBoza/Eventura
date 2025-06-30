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
      {
        path: 'eventgallery',
        loadComponent: () => import('./eventgallery/eventgallery.component').then(m => m.EventGalleryComponent),
      },
        {
        path: 'aboutus',
        loadComponent: () => import('./aboutus/aboutus.component').then(m => m.AboutusComponent),
      },
      {
        path: 'servicesp',
        loadComponent: () => import('./servicesp/servicesp.component').then(m => m.ServicespComponent),
      },
      {
        path: 'contactus',
        loadComponent: () => import('./contact-us/contact-us.component').then(m => m.ContactUsComponent),
      },
      {
        path: 'mytickets',
        loadComponent: () => import('./mytickets/mytickets.component').then(m => m.MyTicketsComponent)
      },
      {
  path: 'events/:id',
  loadComponent: () => import('./eventgallery/event-detail/event-detail.component').then(m => m.EventDetailComponent),
}
      
      
    ],
  },
];

export const ViewsRoutingModule = RouterModule.forChild(routes);
