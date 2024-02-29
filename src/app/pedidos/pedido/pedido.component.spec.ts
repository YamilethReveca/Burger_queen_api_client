import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoComponent } from './pedido.component';
import { PedidosService } from '../../pedidos.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('PedidoComponent', () => {
  let component: PedidoComponent;
  let fixture: ComponentFixture<PedidoComponent>;
  let pedidosService: PedidosService;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidoComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [PedidosService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoComponent);
    component = fixture.componentInstance;
    pedidosService = TestBed.inject(PedidosService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty pedido and productos', () => {
    expect(component.pedido.length).toBe(0);
    expect(component.productos.length).toBe(0);
  });

  it('should change menu and filter productos', () => {
    const productoFiltrado = { id: 3, name: 'Producto 3', price: 30, image: 'imagen3.png', type: 'Cena', dateEntry: '2024-01-01' };
    component.productos = [
      { id: 1, name: 'Producto 1', price: 10, image: 'imagen1.png', type: 'Desayuno', dateEntry: '2024-01-01' },
      { id: 2, name: 'Producto 2', price: 20, image: 'imagen2.png', type: 'Almuerzo', dateEntry: '2024-01-01' },
      productoFiltrado
    ];
    component.menuSeleccionado = 'Almuerzo';
    component.cambiarMenu('Cena');
    expect(component.obtenerProductosFiltrados()).toEqual([productoFiltrado]);
  });

  it('deberia llamar al ngOnInit', () => {

    const mockResponse = [{
      id: 123,
      name: 'chocolate',
      price: 500,
      image: 'imagen4.png',
      imageFallback: 'imagen5.png',
      type: 'bebida',
      dateEntry: '2024-02-10',
    }];
    jest.spyOn(pedidosService, 'obtenerPedidos').mockReturnValue(of(mockResponse));

    component.ngOnInit();
    expect(component.productos).toEqual(mockResponse);

  })


  it('deberia agregando Producto en el Resumen', () => {
    const pedido1 = { id: 1, name: 'Producto 1', price: 10, image: 'imagen1.png', type: 'Desayuno', dateEntry: '2024-01-01' };
    const pedido2 = { id: 2, name: 'Producto 2', price: 20, image: 'imagen2.png', type: 'Almuerzo', dateEntry: '2024-01-01' };

    component.pedido = [
      pedido1,
      pedido2,
    ]
    const pedido3 = { id: 3, name: 'Producto 3', price: 30, image: 'imagen3.png', type: 'Desayuno', dateEntry: '2024-01-01' }
    component.agregandoProductoResumen(pedido3);
    expect(component.pedido).toEqual([pedido1, pedido2, pedido3]);
    expect(component.total).toBe(60);
  })


  it('deberia eliminar del pedido', () => {

    const mockPedido = [
      { id: 1, name: 'Producto 1', price: 10, image: 'imagen1.png', type: 'Desayuno', dateEntry: '2024-01-01' },
      { id: 2, name: 'Producto 2', price: 20, image: 'imagen2.png', type: 'Almuerzo', dateEntry: '2024-01-01' },
      { id: 3, name: 'Producto 3', price: 30, image: 'imagen3.png', type: 'Desayuno', dateEntry: '2024-01-01' }
    ];
    component.pedido = [...mockPedido]; // Inicializar pedido con productos de prueba
    const indexToDelete = 1; // Índice del producto a eliminar

    // Act
    component.eliminarDelPedido(indexToDelete);

    // Assert
    // Comprobar que se eliminó un producto del pedido
    expect(component.pedido.length).toBe(mockPedido.length - 1);
    // Comprobar que el total se actualizó correctamente
    const expectedTotal = mockPedido.reduce((total, product) => {
      if (product.id !== mockPedido[indexToDelete].id) {
        return total + product.price;
      }
      return total;
    }, 0);
    expect(component.total).toBe(expectedTotal);
    // Comprobar que el producto eliminado ya no está en el pedido
    expect(component.pedido.some(product => product.id === mockPedido[indexToDelete].id)).toBeFalsy();
  });

  it('deberia no hacer nada cuando el arreglo vacio esta vacio', () => {

    const consoleSpy = jest.spyOn(console, 'warn');
    component.pedido = [];
    component.enviarACocina();

    expect(consoleSpy).toHaveBeenCalledWith('No hay productos en el pedido. No se enviará a cocina.')

  })

  it('deberia enviar pedido a cocina y responder correctamente', () => {
    const mockPedidoResponse = {
      userId: 3,
      client: "charly",
      products: [{
        qty: 1,
        product: {
          id: 2,
          name: 'chocolate',
          price: 500,
          image: 'imagen3.png',
          type: 'bebida',
        },
      }],
      status: 'pendiente',
    }
    component.pedido = [{ id: 1, name: 'Producto 1', price: 10, image: 'imagen1.png', type: 'Desayuno', dateEntry: '2024-01-01' }]
    component.nombreCliente = 'reveca';
    component.total = 1000;
    jest.spyOn(pedidosService, 'enviarPedidoACocina').mockReturnValue(of(mockPedidoResponse));

    component.enviarACocina();

    expect(component.pedido).toEqual([]);
    expect(component.total).toBe(0);
    expect(component.nombreCliente).toBe('');

  })

  it('deberia enviar pedido a cocina y responder incorrectamente', () => {
    const mockError = { error: 'Error creando el pedido' };
    jest.spyOn(pedidosService, 'enviarPedidoACocina').mockReturnValue(throwError(mockError));
    const consoleSpy = jest.spyOn(console, 'error');
    component.pedido = [{ id: 1, name: 'Producto 1', price: 10, image: 'imagen1.png', type: 'Desayuno', dateEntry: '2024-01-01' }]
    component.enviarACocina();
    expect(consoleSpy).toHaveBeenCalledWith('Error al enviar a cocina:', mockError);
  })

});
