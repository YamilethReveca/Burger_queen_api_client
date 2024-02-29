import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoComponent } from './pedido/pedido.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PedidosListosComponent } from './pedidos-listos/pedidos-listos.component'

const routes: Routes = [
  { path: '', component: PedidoComponent },
  { path: 'listo', component: PedidosListosComponent }

]


@NgModule({
  declarations: [
    PedidoComponent,
    PedidosListosComponent,

  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PedidosModule { }
