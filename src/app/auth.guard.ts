import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

constructor(private authService: AuthService, private router: Router){}

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
        // Redirigir a la vista de pedidos
        this.router.navigate(['pedidos']);
        return true; // Permitir acceso al componente asociado a la ruta actual
      case 'chef':
        // Redirigir a la vista de cocina
        this.router.navigate(['cocina']);
        return true; // Permitir acceso al componente asociado a la ruta actual
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