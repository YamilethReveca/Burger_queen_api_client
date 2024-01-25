import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';// inyeccion del servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //propiedad formulario y se espera que sea de tipo  FormGroup
  //FormGrup es una clase que proporcionada por el módulo @angular/forms

  formulario!: FormGroup;
  errorMensaje!: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
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

    this.authService.login(email, clave).subscribe({
      next: (response: { accessToken: string }) => {
        if (response && response.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
          this.router.navigate(['pedidos']);
        } else {
          console.error('Error de autenticación');
        }
      },
      error: (error: any) => {

        console.error('Error de autenticación:', error);

        if (error && error.error) {
          this.errorMensaje = error.error;
        } else {
          this.errorMensaje = 'Error de autenticación';
        }

        console.log('Valor de errorMensaje:', this.errorMensaje);
      }
    });
  }
}