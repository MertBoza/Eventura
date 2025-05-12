import { Routes } from '@angular/router';
import { EventGalleryComponent } from './eventgallery.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

export const eventGalleryRoutes: Routes = [
  {
    path: 'eventgallery',
    component: EventGalleryComponent,
  },
  {
    path: 'eventgallery/:id',
    component: EventDetailComponent,
  }
];
