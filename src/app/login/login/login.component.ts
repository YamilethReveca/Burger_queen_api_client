import { Component, OnInit , OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // FORMULARIO REACTIVO
import { AuthService } from '../../auth.service'; // Inyeccion del servicio 
import { Subscription } from 'rxjs'; // se usa para despues desuscribirme de una suscripcion.
import { LoginResponse } from 'src/app/models/loginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy  {

  //propiedad formulario y se espera que sea de tipo  FormGroup
  //FormGrup es una clase que proporcionada por el módulo @angular/forms

  formulario!: FormGroup;
  errorMensaje!: string;
  private subscription: Subscription | undefined;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService, 
   
  ) { }
  

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    });
  }
  
  // validar si el correo y el password es correcto, si lo es me envia al pedido sino me muestra el error.
  enviarFormulario(): void {
    const { email, clave } = this.formulario.value;

    this.subscription = this.authService.login(email, clave).subscribe(
      (response: LoginResponse) => {
        console.log(response);
          this.authService.setIsLoggedInVar=true;
          localStorage.setItem("accessToken", response.accessToken); // Almacena un token simulado
          localStorage.setItem("userRole", response.user.role); // Almacena el rol del usuario
         
          const role = response.user.role;
          
          if (role === 'chef') {
            this.router.navigate(['cocina']);
          } else {
            this.router.navigate(['pedidos']);
          }
        },
        (error: any) => {
          console.error('Error de autenticación:', error);
    
          if (error && error.error) {
            this.errorMensaje = error.error;
          } else {
            this.errorMensaje = 'Error de autenticación';
          }
    
          console.log('Valor de errorMensaje:', this.errorMensaje);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}