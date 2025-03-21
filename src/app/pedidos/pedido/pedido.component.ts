import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductResponse } from '../../models/productResponse';
import { PedidosService } from '../../pedidos.service';
import { OrderResponse } from '../../models/orderResponse';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit, OnDestroy {


  productos: ProductResponse[] = []; // los productos completos 20
  pedido: ProductResponse[] = [];  // uno por uno para el resumen
  total: number = 0; // inicializo en 0 el total
  menuSeleccionado: string = 'Desayuno'; // tipo de menú seleccionado
  nombreCliente: string = '';


  private subscription: Subscription | undefined;

  constructor(private pedidoService: PedidosService, private router: Router) { }


  ngOnInit(): void {

    // inicializo para obtener la respuesta del servicio para que me muestre

    this.subscription = this.pedidoService.obtenerPedidos().subscribe(

      (response: ProductResponse[]) => {

        this.productos = response;

      },


      // () => { }

    )
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

    this.pedido.push(producto);// agrego el producto al resumen

    this.total = this.pedido.reduce((number, productResponse) => number + productResponse.price, 0); // es el total de cada

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


  enviarACocina(): void {
    // Verifica si hay productos en el pedido antes de enviar a cocina
    if (this.pedido.length === 0) {
      console.warn('No hay productos en el pedido. No se enviará a cocina.');
      return;
    }

    // Obtiene información adicional, como el cliente
    const cliente = this.nombreCliente;  // Reemplaza con la lógica para obtener el nombre del cliente

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;




    // Estructura el objeto de pedido utilizando el modelo OrderResponse
    const pedido: OrderResponse = {
      userId: 4,  // Reemplaza con el ID del usuario
      client: cliente,
      products: this.pedido.map(producto => ({
        qty: 1,  // Puedes ajustar la cantidad según tus necesidades
        product: {
          id: producto.id,  // Ajusta según la estructura real de tu ProductResponse
          name: producto.name,
          price: producto.price,
          image: producto.image,
          type: producto.type,
        }
      })),
      status: 'pending',
      dateEntry: formattedDate,
    };

    // Llama al servicio para enviar el pedido a cocina
    this.pedidoService.enviarPedidoACocina(pedido).subscribe(
      (response) => {
        console.log('Pedido enviado a cocina:', response);

        this.pedido = [];
        this.total = 0;
        this.nombreCliente = "";
        this.menuSeleccionado = 'Ninguno';
      },
      (error) => {
        console.error('Error al enviar a cocina:', error);
      }
    );
  }

  verPedidosListo() {
    this.router.navigate(['pedidos','listo']);

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
