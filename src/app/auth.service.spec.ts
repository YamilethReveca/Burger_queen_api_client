import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { HttpClientTestingModule } from "@angular/common/http/testing";

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    http= TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('deberia retornar el valor de la propiedad  isLoggedInVar', () => {

    const isLoggedIn = service.isLoggedIn();

    expect(isLoggedIn).toBe(false);

  })


  it(' deberia ejecutar la funcion logout correctamente', () => {

    service.setIsLoggedInVar = true;

    service.logout();

    const isLoggedIn= service.isLoggedIn();

    expect(isLoggedIn).toBe(false);

  })


  it('deberia ejecurar login correctamente',()=>{


    const httpSpy = jest.spyOn(http, 'post');
    const observable= service.login("", "");

    expect(httpSpy).toHaveBeenCalled();
    expect(observable instanceof Observable).toBe(true);

  })
});
