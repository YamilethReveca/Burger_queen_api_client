import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Subscription } from 'rxjs';
import { LoginResponse } from '../../models/loginResponse';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, HeaderComponent, FooterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [FormBuilder, AuthService],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    jest.resetAllMocks(); // Reiniciar todos los mocks antes de cada prueba

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('debe navegar a "pedidos" al iniciar sesión correctamente', () => {
    const mockResponse: LoginResponse = {
      accessToken: 'fakeAccessToken',
      user: {
        email: '',
        role: '',
        id: 1
      }
    };
    jest.spyOn(authService, 'login').mockReturnValue(of(mockResponse));
    jest.spyOn(Storage.prototype, 'setItem');

    const navigateSpy = jest.spyOn(router, 'navigate');

   
    component.ngOnInit();


    component.enviarFormulario();

    expect(navigateSpy).toHaveBeenCalledWith(['pedidos']);
    expect(authService.isLoggedIn()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', mockResponse.accessToken);
  });



  it('debería establecer errorMensaje en caso de error de autenticación', () => {
    // Simular un error durante la autenticación
    const mockError = { error: 'Error de autenticación' };
    jest.spyOn(authService, 'login').mockReturnValue(throwError(mockError));
  
    component.ngOnInit();
    component.enviarFormulario();
  
    // Verificar que errorMensaje se haya establecido correctamente
    expect(component.errorMensaje).toBe(mockError.error);
  });
  

  it('debería establecer errorMensaje en caso de error sin mensaje específico', () => {
    // Simular un error sin un mensaje específico
    const mockErrorWithoutMessage = {};
    jest.spyOn(authService, 'login').mockReturnValue(throwError(mockErrorWithoutMessage));
  
    component.ngOnInit();
    component.enviarFormulario();
  
    // Verificar que errorMensaje se haya establecido correctamente
    expect(component.errorMensaje).toBe('Error de autenticación');
  });

  
  
});