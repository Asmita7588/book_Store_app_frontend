import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/books/book.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  allBooks: any=[] ;
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private bookService : BookService
  ) {}
  cartBook: any = [];
  

  CustomerDetails!: FormGroup;
  addressType: string[] = ['Home', 'work', 'others'];
  count: any;
  customerDetails = false;
  address = true;
  placeOrder = true;
  summary = true;
  continue = true;
  item_qty: any;

  ngOnInit() {
    this.getAllBook();
    this.CustomerDetails = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      selectedAddressType: ['', [Validators.required]],

    });
  }
getBookDetail(bookId: number) {
  return this.allBooks?.find((book: any) => book.bookId === bookId);
}

  getAllBook() {
    this.cartService.getAllBooks().subscribe((response: any) => {
  console.log('Raw cartBook response:', response);
  if (Array.isArray(response)) {
    this.cartBook = response;
  } else if (Array.isArray(response.data)) {
    this.cartBook = response.data;
  } else {
    console.error("Unexpected response format from getAllBooks:", response);
    this.cartBook = []; 
  }
});
    this.bookService.getAllBook().subscribe((books: any) => {
    this.allBooks = books;
      
  });
  }

  deleteSingleBook(bookId: number) {
    console.log(bookId);
    
    this.cartService.deleteOneBook(bookId).subscribe((response: any) => {
      console.log('delete api is hiting', response);
      this.getAllBook()
    });
    this.snackbar.open('Book Removed', '', {
      duration: 2000,
      verticalPosition: 'bottom',
    });
  }

  addresssDetails() {
    this.address = false;
    this.placeOrder = false;
  }
  

  onContinue() {
    this.customerDetails = true;
    console.log(this.customerDetails);
    if (this.CustomerDetails.valid) {
      this.summary = false;
      this.continue = false;
      console.log('customers Details is callled', this.CustomerDetails.value);
      let data = {
        fullName :this.CustomerDetails.value.fullName,
        mobile :this.CustomerDetails.value.mobileNumber,
        address: this.CustomerDetails.value.address,
        city: this.CustomerDetails.value.city,
        state: this.CustomerDetails.value.state,
        type: this.CustomerDetails.value.selectedAddressType,
      };
      this.cartService.customersdetails(data).subscribe((response: any) => {
        console.log('customers details', response);
      });
      this.snackbar.open('Customers Details filled Sucessfully', '', {
        duration: 3000,
        verticalPosition: 'bottom',
      });
    }
  }

  increasebook(cartItem: any) {
  this.item_qty = cartItem.quantity;
  this.item_qty += 1;
  console.log('increased', this.item_qty);
  this.updateCount(cartItem.bookId, cartItem.cartId);
  this.snackbar.open('Book is increased', '', {
    duration: 2000,
    verticalPosition: 'bottom',
  });
}
  decreasebook(cartItem: any) {
    this.item_qty = cartItem.quantity;
  this.item_qty -= 1;
  console.log('increased', this.item_qty);
  this.updateCount(cartItem.bookId, cartItem.cartId);
  this.snackbar.open('Book is increased', '', {
    duration: 2000,
    verticalPosition: 'bottom',
  });
  }

  updateCount(bookId: number, cartId: number) {
  let reqData = {
    bookId: bookId,
    quantity: this.item_qty,
  };

  this.cartService.quantity(cartId, reqData).subscribe((res: any) => {
  this.getAllBook()
    console.log(res);
  });
}
confirmOrder() {
  this.cartService.placeOrder().subscribe((res: any) => {
    console.log("Order Response: ", res);
    this.getAllBook(); 
  }, error => {
    console.error("Error placing order:", error);
  });
}


}
