import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http-service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  token: any;
     getorderUrl = "/api/wishlist";
      constructor(private httpService: HttpService) {
        this.token = localStorage.getItem('accessToken');
      }
  getorderedBooks() {
    if (!this.token) {
      console.error('Token not found');
      return;
    }
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
  
    return this.httpService.getApi("/api/order",  httpOptions.headers);
  }
  
}
