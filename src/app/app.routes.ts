import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductsListComponent } from './pages/admin/products/products-list/products-list.component';
import { AddProductsComponent } from './pages/admin/products/add-products/add-products.component';
import { EditProductComponent } from './pages/admin/products/edit-product/edit-product.component';

export const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            }, {
                path: 'products',
                component: ProductsListComponent
            }, {
                path: 'products/add',
                component: AddProductsComponent
            }, {
                path: 'products/edit/:id',
                component: EditProductComponent
            }, {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
    }
];
