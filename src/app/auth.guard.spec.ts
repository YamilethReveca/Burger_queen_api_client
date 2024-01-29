import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

import { HttpClientTestingModule } from "@angular/common/http/testing";

import { Router } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';




describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: { isLoggedIn: jest.fn(() => true) } }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


  it('deberia navegar si el usuario esta autenticado', () => {


    const canActivateResult = guard.canActivate(null as any);

    expect(canActivateResult).toBe(true);

    expect(authService.isLoggedIn).toHaveBeenCalled();

  });


  it('deberia devolver al login si el usuario no esta autenticado', () => {

    jest.spyOn(authService, 'isLoggedIn').mockReturnValue(false);

    const navegateSpy = jest.spyOn(router, 'parseUrl');

    guard.canActivate(null as any);

    expect(navegateSpy).toHaveBeenCalledWith("");

  })
});
