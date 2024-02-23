import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';
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
    this.authService.obtenerOrdenesCocina().subscribe(
      (ordenes: any[]) => {
        // Iterar sobre las órdenes para agregar la hora del pedido y la hora de lista
        this.ordenes = ordenes.map(orden => {
          const horaPedido = this.formatDate(new Date(orden.dateEntry));
          const horaFinalizacion = orden.status && orden.status === 'delivering' ? this.formatDate(new Date()) : '';
          const tiempoTranscurrido = this.calcularTiempoTranscurrido(horaPedido, horaFinalizacion);
          return {
            ...orden,
            horaPedido: horaPedido,
            horaLista: horaFinalizacion,
            tiempoTranscurrido: tiempoTranscurrido
          };
        });
  
        // Calcular el tiempo transcurrido para cada orden
        this.ordenes.forEach(orden => {
          orden.tiempoTranscurrido = this.calcularTiempoTranscurrido(orden.horaPedido, orden.horaLista);
        });
      },
      (error) => {
        console.error('Error al obtener las órdenes de cocina:', error);
      }
    );
  }

  marcarComoListo(idOrden: number): void {
    const horaPedido = this.obtenerHoraPedido(idOrden);
    this.authService.marcarOrdenComoListo(idOrden).subscribe(
      () => {
        // Si la solicitud se realizó correctamente, recargar las órdenes
        this.obtenerOrdenesCocina();
      },
      error => {
        console.error('Error al marcar la orden como lista:', error);
      }
    );
  }

  private formatDate(date: Date): string {
    // Formatea la fecha y hora en formato legible
    return date.toLocaleString();
  }

  private obtenerHoraPedido(idOrden: number): string {
    const orden = this.ordenes.find(ord => ord.id === idOrden);
    return orden ? orden.horaPedido : null;
  }

  calcularTiempoTranscurrido(horaPedido: string, horaFinalizacion: string): string {
    if (!horaPedido || !horaFinalizacion) return 'Tiempo no disponible';
    
    const fechaPedido = new Date(horaPedido);
    const fechaFinalizacion = new Date(horaFinalizacion);

    const diferenciaTiempo = fechaFinalizacion.getTime() - fechaPedido.getTime();
    const minutos = Math.floor(diferenciaTiempo / 60000);
    const segundos = Math.floor((diferenciaTiempo % 60000) / 1000);

    return `${minutos} minutos ${segundos} segundos`;
  }

}


