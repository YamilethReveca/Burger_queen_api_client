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
          return {
            ...orden,
            horaPedido: this.formatDate(new Date(orden.dateEntry)),
            horaLista: orden.status === 'delivering' ? this.formatDate(new Date()) : null
          };
        });
      },
      (error) => {
        console.error('Error al obtener las órdenes de cocina:', error);
      }
    );
  }


  marcarComoListo(idOrden: number): void {
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


  // Función para calcular el tiempo transcurrido
calcularTiempoTranscurrido(horaPedido: string, horaFinalizacion: string): string {
  // Parsear las horas en objetos de fecha
  const fechaPedido = new Date(horaPedido);
  const fechaFinalizacion = new Date(horaFinalizacion);

  // Calcular la diferencia de tiempo en milisegundos
  const diferenciaTiempo = fechaFinalizacion.getTime() - fechaPedido.getTime();

  // Calcular los minutos y segundos
  const minutos = Math.floor(diferenciaTiempo / 60000); // 1 minuto = 60000 milisegundos
  const segundos = Math.floor((diferenciaTiempo % 60000) / 1000); // 1 segundo = 1000 milisegundos

  // Formatear la salida
  return `${minutos} minutos ${segundos} segundos`;
}
  
}


