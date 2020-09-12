import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRoutingGuard } from './guard/login-routing.guard';

import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { DashboardsComponent } from './page/dashboards/dashboards.component';
import { MainComponent } from './page/dashboards/main/main.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboards/main', pathMatch: 'full' },
    {
        path: 'dashboards',
        component: DashboardsComponent,
        canActivate: [LoginRoutingGuard],
        children: [
            {
                path: 'main',
                component: MainComponent
            }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
