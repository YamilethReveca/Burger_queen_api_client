import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { tap} from 'rxjs/operators';
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
          let horaPedido = orden.dateEntry ? this.formatDate(new Date(orden.dateEntry)) : '';
          let horaFinalizacion = orden.status && orden.status === 'delivering' ? this.formatDate(new Date()) : '';
          horaPedido = horaPedido ? this.parsearStringFecha(horaPedido) : '';
          horaFinalizacion = horaFinalizacion.length > 0 ? this.parsearStringFecha(horaFinalizacion) : horaFinalizacion;

          const tiempoTranscurrido = this.calcularTiempoTranscurrido(horaPedido, horaFinalizacion);
          return { ...orden, horaPedido, horaLista: horaFinalizacion, tiempoTranscurrido };
        });

        console.log("Órdenes recibidas:", this.ordenes);
      })
    ).subscribe({
      error: (error) => console.error('Error al obtener las órdenes de cocina:', error)
    });
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
    return orden ? orden.horaPedido : ''; // Devolvemos una cadena vacía en lugar de null
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

parsearStringFecha(date:string){

  // van a llegar asi: "19/2/2024, 18:15:04"
  // debe devolvese asi: "1995-12-17T03:24:00"

  const fechaSeparada= date.split(", ");
  const fechaUno= fechaSeparada[0].split("/");
  fechaUno[0]= fechaUno[0].length > 1 ? fechaUno[0] : "0" + fechaUno[0];
  fechaUno[1] = fechaUno[1] && fechaUno[1].length > 1 ? fechaUno[1] : "0" + fechaUno[1];


  const fechaFormateada= fechaUno.reverse().join("-");
  const fechaFinal= fechaFormateada+ "T"+ fechaSeparada[1];

  return fechaFinal;

  //["19", "02", "2024"]

}


}


