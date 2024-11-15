import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { ProductoDetailComponent } from './productos/producto-detail/producto-detail.component';
import { ProductoUpdateComponent } from './productos/producto-update/producto-update.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'productos/:id/detail',
    component: ProductoDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'productos/:id/edit',
    component: ProductoUpdateComponent,
    canActivate: [authGuard],
  },
  {
    path: 'productos/new',
    component: ProductoUpdateComponent,
    canActivate: [authGuard],
  },
];
