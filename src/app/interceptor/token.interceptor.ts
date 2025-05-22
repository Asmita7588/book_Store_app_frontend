import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject : BehaviorSubject<any>= new BehaviorSubject<any>(null);
  constructor(private authService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.authService.getToken();
    let authReq = request
    if(token){
      authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
    }
    return next.handle(request).pipe(
      catchError((error) =>{
        if(error instanceof HttpErrorResponse && error.status === 401){
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    )
  }
   private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((tokenResponse) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokenResponse.accessToken);
          return next.handle(this.addToken(req, tokenResponse.accessToken));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap((token) => next.handle(this.addToken(req, token)))
      );
    }
  }
  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
  }
}
