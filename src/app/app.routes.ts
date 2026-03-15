import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductsListComponent } from './pages/admin/products/products-list/products-list.component';
import { AddProductsComponent } from './pages/admin/products/add-products/add-products.component';
import { EditProductComponent } from './pages/admin/products/edit-product/edit-product.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { OrdersListComponent } from './pages/admin/orders/orders-list/orders-list.component';
import { AddOrderComponent } from './pages/admin/orders/add-order/add-order.component';
import { EditOrderComponent } from './pages/admin/orders/edit-order/edit-order.component';
import { ViewOrderComponent } from './pages/admin/orders/view-order/view-order.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/add',
        component: AddProductsComponent,
      },
      {
        path: 'products/edit/:id',
        component: EditProductComponent,
      },
      {
        path: 'orders',
        component: OrdersListComponent,
      },
      {
        path: 'orders/add',
        component: AddOrderComponent,
      },
      {
        path: 'orders/edit/:id',
        component: EditOrderComponent,
      },
      {
        path: 'orders/view/:id',
        component: ViewOrderComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
