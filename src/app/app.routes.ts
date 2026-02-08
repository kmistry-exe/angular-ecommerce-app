import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },{
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
