import { Routes } from '@angular/router'
import { authGuard } from '../core/guards/auth.guard'

export const privateRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
    data: { title: 'Theme - Dashboard' },
  },
  {
    path: 'forms',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/forms/forms.component').then((m) => m.FormsComponent),
    data: { title: 'Theme - Forms' },
  },
  {
    path: 'table',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/table-demo/table-demo.component').then(
        (m) => m.TableDemoComponent,
      ),
    data: { title: 'Theme - Table' },
  },
  {
    path: 'user',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/user/user.component').then((m) => m.UserComponent),
    data: { title: 'Theme - User' },
  },
  {
    path: 'blog',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/blog/blog.component').then((m) => m.BlogComponent),
    data: { title: 'Theme - Blog' },
  },
]
