import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/books/book.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/data/data.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
constructor(private searchService: SearchService, private bookService: BookService, private dataService: DataService, private router : Router,private cartService :CartService){}
bookArray: any[] = [];
cartBook: any[] = [];
searchText: string =''
userName: string = 'Asmita';
@Input() badgeItem: any;
cartItemsCount :any
 searchBook(event: any) {
    this.dataService.SendBookDetails(event.target.value);
  }

  ngOnInit(): void {
    this.getAllCartItems();
 }
 logout() {
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('');
  }

  getAllCartItems(){
    this.cartService.getAllBooks().subscribe((response: any) => {
    console.log("Cart response:", response); 
    if (Array.isArray(response)) {
      this.cartBook = response;
    } else if (Array.isArray(response.data)) {
      this.cartBook = response.data;
    } else {
      console.error("Unexpected response format from getAllBooks:", response);
      this.cartBook = []; 
    }
     this.bookService.getAllBook();
    this.cartItemsCount = this.cartBook.length;
     this.getAllCartItems();


    
    console.log("Cart count:", this.cartItemsCount); 
  });
  }
 
}
