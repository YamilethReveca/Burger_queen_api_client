import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.scss']
})
export class CocinaComponent implements OnInit {

  ordenes: any[] = []; // Variable para almacenar las órdenes de cocina

  constructor(private authService: AuthService) { }

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
}


