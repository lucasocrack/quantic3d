import { Routes } from '@angular/router';
import { publicRoutes } from './public/public.routes';
import { PrivateComponent } from './private/private.component';
import { privateRoutes } from './private/private.routes';
import { AuthenticationComponent } from './core/pages/authentication/authentication.component';
import { authenticationRoutes } from './core/pages/authentication/authentication.routes';
import { PublicComponent } from './public/public.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: publicRoutes,
  },
  {
    path: 'panel',
    component: PrivateComponent,
    children: privateRoutes,
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    children: authenticationRoutes
  },
  { path: '**', redirectTo: '' },
];
