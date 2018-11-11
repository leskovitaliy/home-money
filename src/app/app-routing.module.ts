import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {
    path: 'system',
    loadChildren: './modules/system/system.module#SystemModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent  // TODO: fix load component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
