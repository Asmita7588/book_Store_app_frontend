import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/data/data.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit{

  constructor(
    private dataservice: DataService,
     private cartService: CartService,
    private wishService: WishlistService,
    private snackbar: MatSnackBar
  ) {
    this.hideBadge = true;
    this.badgeCount = 1;
  }
  Book: any;
  increase: any;
  decrease: any;
  addBag: boolean = false;
  count = true;
  item_qty = 1;
  // feedbacks: any;
  comments: string = '';
  value: string = '';
  bookid: any;
  hideBadge: boolean = true;
  showCount: boolean = true;
  badgeCount: number = 1;
   feedbacks = [
    {
      userId: { fullName: 'Aniket Chile' },
      rating: 3,
      comment: `Good product. Even though the translation could have been better, Chanakya's neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct.`
    },
    {
      userId: { fullName: 'Shweta Bodkar' },
      rating: 4,
      comment: `Good product. Even though the translation could have been better, Chanakya's neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct.`
    }
  ];

  ngOnInit(): void {
    this.dataservice.getbookdetails.subscribe((result: any) => {
      this.Book = result;
      console.log('data of book', this.Book);
      this.getAllFeedback();
    });
  }
  addCarts() {
  const bookId = this.Book?.bookId;

  if (!bookId) {
    console.error('Book ID is missing');
    return;
  }

  this.cartService.addToCart(bookId).subscribe(
    (result: any) => {
      console.log('Book added to cart', result);
      this.addBag = true;
      this.count = false;
    },
    (error) => {
      console.error('Failed to add to cart', error);
    }
  );
}

addWishlistBook() {
  const bookId = this.Book?.bookId;

  if (!bookId) {
    console.error('Book ID is missing');
    return;
  }
  this.wishService.addToWishlist(bookId)?.subscribe(
    (res: any) => {
      console.log('Book added to wishlist', res);
      this.snackbar.open('Book Added to Wishlist', '', {
        duration: 2000,
        verticalPosition: 'bottom',
      });
    },
    (error) => {
      console.error('Error adding to wishlist', error);
      this.snackbar.open('Failed to Add Wishlist', '', {
        duration: 2000,
        verticalPosition: 'bottom',
      });
    }
  );
}

  
  hideshow() {
    this.showCount = false;
    this.hideBadge = true;
  }

  increment() {
    this.badgeCount++;
    this.hideBadge = false;
  }
  decrement() {
    if (this.badgeCount < 0) return;
    if (this.badgeCount == 0) {
      this.hideBadge = true;
    }
  }

  increments(Book: any) {
    this.increment();
    this.item_qty = Book.quantity;
    this.item_qty += 1;
    console.log('increase book quantity ', this.item_qty);
    this.updateCount(Book);

    this.snackbar.open('Book is increased', '', {
      duration: 2000,
      verticalPosition: 'bottom',
    });
  }

  decrements(Book: any) {
    this.decrement();
    this.item_qty = Book.quantity;
    if (this.item_qty > 0) {
      this.item_qty -= 1;
    }
    console.log('decreased book quantity', this.item_qty);
    this.updateCount(Book);

    this.snackbar.open('Book is decreased', '', {
      duration: 2000,
      verticalPosition: 'bottom',
    });
  }

  updateCount(Book: any) {
    this.item_qty = Book.quantity;
    this.item_qty += 1;
    console.log('quantity of new', this.item_qty);
    console.log('Quantity of exstings', Book.quantity);
    console.log('Update book Api before Called');
    console.log('bookId', Book.bookId);

    let reqData = 
    {
      quantityToBuy: 1,
    };
    this.cartService.quantity(Book.bookId, reqData).subscribe((response: any) => {
      console.log('UpdateBook API is called', response);
    });

  }

  getAllFeedback() {
    // this.cartService.getFeedback(this.Book._id).subscribe((response: any) => {
    //   console.log(response);
    //   (this.feedbacks = response.result),
    //     console.log('feedbacks', this.feedbacks);
    // });
  }
  addFeedback() {
    let data = {
      comment: this.comments,
      rating: '2',
      bookid: this.Book._id,
    };
    // this.cartService.addFeedback(data).subscribe((response: any) => {
    //   console.log('feedBack Added', response);
    //   this.getAllFeedback();
    // });
  }

}
