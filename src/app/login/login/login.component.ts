import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  enviarFormulario() {

    if (this.formulario && this.formulario.get('email')) {

      if (this.formulario.valid) {
        this.router.navigate(['pedidos']);
      }
    }
  }
}





