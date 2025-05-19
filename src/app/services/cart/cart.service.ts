import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http-service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  token: any;
  cartUrl = '/api/cart';
  deleteCartUrl = '/api/cart';
   updateCartUrl = '/api/cart';

  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('accessToken');
  }

addToCart(bookId: number) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  const url = `${this.cartUrl}?bookId=${bookId}`;

  return this.httpService.postApi(url, null, httpOptions.headers);
}

 getAllBooks() {
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };
    return this.httpService.getApi(
      '/api/cart',
      httpOptions.headers
    );
  }

 deleteOneBook(bookId: number) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  const url = `${this.deleteCartUrl}?bookId=${bookId}`;
  return this.httpService.deleteApi(url, null, httpOptions.headers);
}


  customersdetails(reqData:any){
     const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };
    return this.httpService.postApi('/api/Customer' , reqData,
      httpOptions.headers
    );
  }

  quantity(cartId: number, reqData: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  const url = `${this.updateCartUrl}?cartId=${cartId}`;
  return this.httpService.putApi(url, reqData, httpOptions.headers);
}
placeOrder() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`, 
    }),
  };

  return this.httpService.postApi('/api/order', null, httpOptions.headers);
}

}
