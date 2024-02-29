import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/pedidos.service';
import { Subscription } from 'rxjs';
import { ProductResponse } from 'src/app/models/productResponse';
import { OrderResponse } from 'src/app/models/orderResponse';


@Component({
  selector: 'app-pedidos-listos',
  templateUrl: './pedidos-listos.component.html',
  styleUrls: ['./pedidos-listos.component.scss']
})
export class PedidosListosComponent implements OnInit {

  private subscription: Subscription | undefined;
  pedidosListoCocina: OrderResponse[] = [];

  constructor(private pedidoService: PedidosService) { }

  ngOnInit(): void {


    this.subscription = this.pedidoService.obtenerPedidosDeliveringCocina('delivering').subscribe(

      (response: OrderResponse[]) => {

        this.pedidosListoCocina = response;

      })


  }


}
