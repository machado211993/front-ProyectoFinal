import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { ProductoDetailComponent } from './productos/producto-detail/producto-detail.component';
import { ProductoUpdateComponent } from './productos/producto-update/producto-update.component';
import { ProductoListComponent } from './productos/producto-list/producto-list.component';
import { CarritoComponent } from './carrito/carrito.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { adminGuard } from './admin.guard';
import { ListarCategoriasComponent } from './categorias/listar-categorias/listar-categorias.component';
import { EditarCategoriaComponent } from './categorias/editar-categoria/editar-categoria.component';
import { FinalizarCompraComponentComponent } from './finalizar-compra-component/finalizar-compra-component.component';
import { VentasComponent } from './ventas/ventas.component';
// Importar el componente de finalizar compra

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'productos',

    children: [
      {
        path: '',
        component: ProductoListComponent,
      },
      {
        path: ':id/detail',
        component: ProductoDetailComponent,
      },
      {
        path: ':id/edit',
        component: ProductoUpdateComponent,
      },
      {
        path: 'new',
        component: ProductoUpdateComponent,
      },
    ],
  },
  { path: 'carrito', component: CarritoComponent },

  // Ruta para finalizar la compra
  { path: 'finalizar-compra', component: FinalizarCompraComponentComponent, canActivate: [authGuard] },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },

  /* Rutas de categorías */
  { path: 'categorias', component: ListarCategoriasComponent },
  { path: 'categorias/nueva', component: EditarCategoriaComponent },
  { path: 'categorias/editar/:id', component: EditarCategoriaComponent },

  /* Rutas de ventas */
  { path: 'ventas', component: VentasComponent },

];
