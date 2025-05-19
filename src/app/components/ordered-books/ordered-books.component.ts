import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-ordered-books',
  templateUrl: './ordered-books.component.html',
  styleUrls: ['./ordered-books.component.css']
})
export class OrderedBooksComponent implements OnInit{
ordered : any = [];
  Book:any;
  constructor(private orderService : OrderService){}
  ngOnInit() {
    this.getOrdersBooks();
  }

  getOrdersBooks() {
    this.orderService.getorderedBooks()?.subscribe((response: any) => {
      (this.ordered = response.data)
      console.log('Get ordered books Api is called', response);
      console.log(this.ordered);
      
    });
  }
}
