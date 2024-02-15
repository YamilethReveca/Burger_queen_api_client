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
        this.ordenes = ordenes;
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
}


