import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoComponent } from './pedido.component';
import { PedidosService } from '../pedidos.service';
import { ProductResponse } from '../models/productResponse';
import { OrderResponse } from '../models/orderResponse';
import { of } from 'rxjs';

describe('PedidoComponent', () => {
  let component: PedidoComponent;
  let fixture: ComponentFixture<PedidoComponent>;
  let pedidosService: PedidosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoComponent],
      providers: [ PedidosService ]
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
    component.productos = [
      { id: 1, name: 'Producto 1', price: 10, image: 'imagen1.png', type: 'Desayuno', dateEntry: '2024-01-01' },
      { id: 2, name: 'Producto 2', price: 20, image: 'imagen2.png', type: 'Almuerzo', dateEntry: '2024-01-01' },
      { id: 3, name: 'Producto 3', price: 30, image: 'imagen3.png', type: 'Cena', dateEntry: '2024-01-01' }
    ];
    component.menuSeleccionado = 'Almuerzo';
    component.cambiarMenu('Cena');
    expect(component.obtenerProductosFiltrados().length).toBe(1);
  });

  // Agrega más pruebas según sea necesario para cubrir la lógica de tu componente
});
