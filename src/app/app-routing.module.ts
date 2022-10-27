import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from "./core/main-page/main-page.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AuthGuard} from "./providers/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    /*canActivate: [
      AuthGuard,
    ],*/
    // loadChildren: 'app/modules/modules.module#ModulesModule',
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'reportes',
        loadChildren: () => import('./pages/reportes/reportes.module')
          .then(m => m.ReportesModule)
      },
      {
        path: 'clase',
        loadChildren: () => import('./pages/clase/clase.module')
          .then(m => m.ClaseModule),/* canActivate: [
          AuthGuard,
        ]*/
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./pages/usuarios/usuarios.module')
          .then(m => m.UsuariosModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },/*
  {
    path: 'oauth',
    redirectTo: 'usuarios/login',
    pathMatch: 'full'
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
