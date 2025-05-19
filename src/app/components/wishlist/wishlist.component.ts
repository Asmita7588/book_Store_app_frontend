import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  constructor(private wishService: WishlistService , private snackbar : MatSnackBar) {}
  wishlist : any = [];
  Book:any;
  ngOnInit() {
    this.getWishlistBooks();
  }

  getWishlistBooks() {
    this.wishService.getWishListBooks()?.subscribe((response: any) => {
      (this.wishlist = response.data)
      console.log('Get Wishlist Api is called', response);
      console.log(this.wishlist);
      
    });
  }
  deletewishListBooks(reqData:number){
    console.log(reqData);
    this.wishService.deleteWishListBook(reqData)?.subscribe((response:any)=>{
       this.getWishlistBooks()
      console.log('delete Api is Called', response);
    })
    this.snackbar.open('WishList Book Removed' ,'',{
      duration:2000,
      verticalPosition:'bottom'
    })
  }
}
