import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.scss']
})

export class CocinaComponent implements OnInit {

  ordenes: any[] = []; // Variable para almacenar las órdenes de cocina

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerOrdenesCocina();
  }

  obtenerOrdenesCocina(): void {
    this.authService.obtenerOrdenesCocina().pipe(
      tap((ordenes: any[]) => {
        this.ordenes = ordenes.map(orden => {
          const horaPedido = orden.dateEntry ? this.convertirFechaISO(orden.dateEntry) : '';
          const horaFinalizacion = orden.status === 'delivering' ? this.convertirFechaISO(new Date()) : '';
          const tiempoTranscurrido = horaPedido && horaFinalizacion ? this.calcularTiempoTranscurrido(horaPedido, horaFinalizacion) : 'En proceso';

          return { ...orden, horaPedido, horaLista: horaFinalizacion, tiempoTranscurrido };
        });
        console.log("Órdenes recibidas:", this.ordenes);
      })
    ).subscribe({
      error: (error) => console.error('Error al obtener las órdenes de cocina:', error)
    });
  }

  marcarComoListo(idOrden: number): void {
    this.authService.marcarOrdenComoListo(idOrden).subscribe(
      () => this.obtenerOrdenesCocina(),
      error => console.error('Error al marcar la orden como lista:', error)
    );
  }

  private convertirFechaISO(fecha: string | Date): string {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    if (isNaN(fechaObj.getTime())) return '';
    return fechaObj.toISOString();
  }

  calcularTiempoTranscurrido(horaPedido: string, horaFinalizacion: string): string {
    const fechaPedido = new Date(horaPedido);
    const fechaFinal = new Date(horaFinalizacion);

    if (isNaN(fechaPedido.getTime()) || isNaN(fechaFinal.getTime())) return 'Tiempo no disponible';

    const diferenciaTiempo = fechaFinal.getTime() - fechaPedido.getTime();
    const minutos = Math.floor(diferenciaTiempo / 60000);
    const segundos = Math.floor((diferenciaTiempo % 60000) / 1000);

    return `${minutos} min ${segundos} seg`;
  }
}
