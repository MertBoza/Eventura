import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homepage' }, 
  {
    path: '',
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
  },
  {
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.module').then((m) => m.AdminModule),
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
