import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosListosComponent } from './pedidos-listos.component';

describe('PedidosListosComponent', () => {
  let component: PedidosListosComponent;
  let fixture: ComponentFixture<PedidosListosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosListosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosListosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
