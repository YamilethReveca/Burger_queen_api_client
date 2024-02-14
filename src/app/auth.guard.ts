import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Verificar si el usuario está autenticado
    if (this.authService.isLoggedIn()) {
      // Obtener el rol del usuario autenticado
      const userRole = this.authService.getUserRole();

      // Redirigir según el rol del usuario
      switch (userRole) {
        case 'waiter':
          // Si el usuario es 'waiter', permitir acceso a la ruta de pedidos
          if (state.url.includes('/pedidos')) {
            return true;
          } else {
            this.router.navigate(['pedidos']); // Redirigir a la ruta de pedidos si intenta acceder a otras rutas
            return false;
          }
        case 'chef':
          // Si el usuario es 'chef', permitir acceso a la ruta de cocina
          if (state.url.includes('/cocina')) {
            return true;
          } else {
            this.router.navigate(['cocina']); // Redirigir a la ruta de cocina si intenta acceder a otras rutas
            return false;
          }
        default:
          // En caso de que el rol no esté definido o sea diferente a 'mesero' o 'chef',
          // redirigir a una vista de error o inicio
          this.router.navigate(['']); // Puedes ajustar la ruta según tus necesidades
          return false;
      }
    } else {
      // Si el usuario no está autenticado, redirigir al componente de inicio de sesión
      this.router.navigate(['login']);
      return false;
    }
  }
}