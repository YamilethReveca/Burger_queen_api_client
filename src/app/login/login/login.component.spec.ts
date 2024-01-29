import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule} from '@angular/router/testing';
import { FormBuilder,ReactiveFormsModule} from '@angular/forms';
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
    authService=TestBed.inject(AuthService);
    router= TestBed.inject(Router);
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
    const localStorageSpy = jest.spyOn(localStorage, 'setItem');
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.enviarFormulario();

    expect(navigateSpy).toHaveBeenCalledWith(['pedidos']);
    expect(authService.isLoggedIn()).toBe(true);
    expect(localStorageSpy).toHaveBeenCalledWith('accessToken', mockResponse.accessToken);
  });

  
});