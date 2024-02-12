import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { PedidosService } from './pedidos.service';

describe('PedidosService', () => {
  let service: PedidosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PedidosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia obtener pedidos', () => {
    
    localStorage.setItem('accessToken', '123');
    const mockPedidos = [{ id: 1, name: 'Producto 1', price: 10 }];
    service.obtenerPedidos().subscribe((pedidos) => {
      expect(pedidos).toEqual(mockPedidos);
    });
    const req = httpTestingController.expectOne('http://localhost:8080/products');
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer 123');
    req.flush(mockPedidos);
  })

  it('deberia enviar pedido a cocina', () => {
    
    localStorage.setItem('accessToken', '123');
    const mockPedido = {
      userId: 4,
      client: 'Cliente de prueba',
      products: [{ id: 1, name: 'Producto 1', price: 10 }],
      status: 'pending'
    };
    
    service.enviarPedidoACocina(mockPedido).subscribe((response) => {
      expect(response).toBeDefined();
      // Agrega más expectativas según la respuesta esperada del servidor
    });

    const req = httpTestingController.expectOne('http://localhost:8080/orders');
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer 123');
    expect(req.request.body).toEqual(mockPedido);

    // Simula una respuesta del servidor
    req.flush({ message: 'Pedido recibido correctamente' });
  });
  
});
