import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http-service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
   token: any;
   wishlistUrl = "/api/wishlist";
    constructor(private httpService: HttpService) {
      this.token = localStorage.getItem('accessToken');
    }

  addToWishlist(bookId: number) {
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

  const url = `${this.wishlistUrl}?bookId=${bookId}`;

  return this.httpService.postApi(url, null, httpOptions.headers);
}

getWishListBooks() {
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

  return this.httpService.getApi("/api/wishlist",  httpOptions.headers);
}

deleteWishListBook(bookId: number) {
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

  const url = `${this.wishlistUrl}?bookId=${bookId}`;

  return this.httpService.deleteApi(url, null, httpOptions.headers);
}


}
