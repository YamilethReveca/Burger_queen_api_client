import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../models/productResponse';
import { Subscription } from 'rxjs';
import { PedidosService } from '../pedidos.service';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {


  productos: ProductResponse[] = []; // los productos completos 20
  pedido: ProductResponse[] = [];  // uno por uno para el resumen 
  total: number = 0; // inicializo en 0 el total
  menuSeleccionado: string = 'Desayuno'; // tipo de menú seleccionado


  private subscription: Subscription | undefined;

  constructor(private pedidoService: PedidosService) { }


  ngOnInit(): void {

    // inicializo para obtener la respuesta del servicio para que me muestre

    this.subscription = this.pedidoService.obtenerPedidos().subscribe(

      (response: ProductResponse[]) => {

        this.productos = response;

      },

      () => { })




  }


  // Filtrar los productos según el tipo de menú seleccionado
  obtenerProductosFiltrados(): ProductResponse[] {

    return this.productos.filter(producto => producto.type === this.menuSeleccionado);
  }

  // Cambiar el tipo de menú seleccionado
  cambiarMenu(menu: string): void {

    this.menuSeleccionado = menu;
  }

  // el total del resumen pedido

  agregandoProductoResumen(producto: ProductResponse): void {

    this.pedido.push(producto);

    this.total = this.pedido.reduce((number, productResponse) => number + productResponse.price, 0);

  }


  // eliminar un producto del resumen de compra

  eliminarDelPedido(index: number): void {
    if (index >= 0 && index < this.pedido.length) {
      const productoEliminado = this.pedido.splice(index, 1)[0];
      this.total = this.pedido.reduce((number, productResponse) => number + productResponse.price, 0);

      // No es necesario llamar al servicio para eliminar el producto del servidor
      console.log(`Producto ${productoEliminado.name} eliminado del resumen del pedido localmente.`);
    }
  }


}
