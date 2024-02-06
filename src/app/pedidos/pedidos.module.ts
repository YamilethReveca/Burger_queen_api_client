import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoComponent } from '../pedido/pedido.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'

const routes: Routes=[
{ path: '', component: PedidoComponent},
]


@NgModule({
  declarations: [
    PedidoComponent,
    
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PedidosModule { }
