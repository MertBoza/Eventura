import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'logging/login' }, 
  {
    path: 'views',
    loadChildren: () =>
      import('./views/views.module').then((m) => m.ViewsModule),
  },
  {
    path: 'logging',
    loadChildren: () =>
      import('./views/logging/logging.module').then((m) => m.LoggingModule),
  },
  {
    path: 'homepage',
    loadChildren: () =>
      import('./views/homepage/homepage.module').then((m) => m.HomepageModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
