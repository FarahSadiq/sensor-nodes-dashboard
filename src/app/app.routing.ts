import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
export const node = sessionStorage.getItem('co-ord')
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/UK-GLA-001',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]}
]
