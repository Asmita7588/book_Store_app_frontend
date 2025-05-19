import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.css']
})
export class DisplayBookComponent implements OnInit {
  
  @Input() bookArray: any;
  Search: any;
  ratingCount = 20;
  originalPrice = 2000;
  totalProduct: any;
   pagination = true;
   p: number = 1;
   itemsPerPage: number = 8;
constructor(private dataService: DataService, private router: Router) {}
  ngOnInit(): void {
    this.dataService.getbookdetails.subscribe((res: any) => {
      console.log('Data After Search', res);
      this.Search = res;
      this.totalProduct = res.length;
    });
    
  }
  onBookclick(book: any) {
    this.dataService.SendBookDetails(book);
    this.router.navigateByUrl('/dashboard/viewbook');
  }
   paginations() {
    if (this.totalProduct==0) {
      this.pagination = false;
    }
  }

}
