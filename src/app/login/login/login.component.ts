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

  formulario: FormGroup = this.formBuilder.group({

    email: ['', [Validators.required, Validators.email]],
    clave: ['', Validators.required]
  });;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService // inyeccion del servicio en el constructor
  ) { }

  ngOnInit(): void { }


  enviarFormulario(): void {

    const { email, clave } = this.formulario.value;

    this.authService.login(email, clave).subscribe({

      next: (response: { accessToken: string }) => {
        if (response && response.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
          this.router.navigate(['pedidos']);
        } else {
          console.error('Error de autenticación');
          // Puedes agregar lógica para mostrar un mensaje de error al usuario en tu componente
        }
      },
      error: (error: any) => {
        console.error('Error de autenticación:', error);
        // Puedes agregar lógica para mostrar un mensaje de error al usuario en tu componente
      }
    });
  }
}