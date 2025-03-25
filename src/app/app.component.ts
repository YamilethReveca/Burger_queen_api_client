import { Component } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  vistas: string[]= ["",'pedidos'];
  hasClassMain: boolean= false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Extrae la ruta actual
        this.hasClassMain = this.vistas.includes(event.urlAfterRedirects.split('/')[1]);
      }
    });
  }

}
