import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './auth.guard';
import { PedidoComponent } from './pedido/pedido.component';
import { CocinaComponent } from './cocina/cocina/cocina.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'pedidos', loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosModule), canActivate: [AuthGuard] }, // Proteger la ruta de pedidos  
  { path: 'cocina', loadChildren: () => import('./cocina/cocina.module').then(m => m.CocinaModule), canActivate: [AuthGuard]  }, // Proteger la ruta de cocina
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
