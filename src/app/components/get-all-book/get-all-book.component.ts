import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/books/book.service';
import { DataService } from 'src/app/services/data/data.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-get-all-book',
  templateUrl: './get-all-book.component.html',
  styleUrls: ['./get-all-book.component.css']
})
export class GetAllBookComponent implements OnInit {
  bookArray = [];
   

  
  constructor(
    private bookService: BookService, private searchService : SearchService, private dataService : DataService
  ) {}
  ngOnInit(): void {
     this.getAllBooks();

  
  }

  getAllBooks() {
    this.bookService.getAllBook().subscribe((response: any) => {
      this.bookArray = response;
      this.bookArray.reverse();
      console.log('this is book array', this.bookArray);
    });
    
  }
  highestPrice() {
   this.bookArray= this.bookArray.sort((a: any, b: any) => b.price - a.price);
    console.log('high to low', this.bookArray);
  }

  lowestPrice() {
    console.log('hello');

    this.bookArray= this.bookArray.sort((a: any, b: any) => a.discountPrice - b.discountPrice);
    console.log('hello', this.bookArray);
  }
  newestArrival() {
    this.bookArray= this.bookArray.reverse();
    console.log('hello', this.bookArray);
  }

  receivemessageDisplayToGetAllBook($event: any) {
    this.getAllBooks();
  }

}
