import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http-service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  token : any;
  constructor(private httpService : HttpService) 
  {
    this.token = localStorage.getItem('accessToken');
   }
   searchUrl = "/api/book/search-book";
   getAllBook() {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
    return this.httpService.getApi('/api/book' ,httpOption.headers 
    );
  }

  getSearchBook(data: any) {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
    return this.httpService.getApi((`${this.searchUrl}?book=${data.bookName}`) ,httpOption.headers ) 
    
  }
}
