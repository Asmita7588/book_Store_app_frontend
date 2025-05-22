import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private refreshInProgress = false;
  private accessToken : string |null = null;
  constructor(private http : HttpClient) { }

  setToken(token: string){
    this.accessToken = token;
  }
  getToken(){
    return this.accessToken;
  }

  refreshToken(): Observable<any> {
  return this.http.post<any>('/api/user/refresh-token', {}).pipe(
    tap((res) => {
      this.setToken(res.data.accessToken); 
    })
  );
}
logout() {
    this.accessToken = null;
  }

}
