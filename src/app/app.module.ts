import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GetAllBookComponent } from './components/get-all-book/get-all-book.component';
import { DisplayBookComponent } from './components/display-book/display-book.component';
import { FilterPipe } from './services/filterService/filter.pipe';
import { MatMenuModule }        from '@angular/material/menu';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewBookComponent } from './components/view-book/view-book.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CartComponent } from './components/cart/cart.component';
import { MatRadioModule } from '@angular/material/radio';
import { OrderComponent } from './components/order/order.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { OrderedBooksComponent } from './components/ordered-books/ordered-books.component';







@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    DashboardComponent,
    GetAllBookComponent,
    DisplayBookComponent,
    FilterPipe,
    ViewBookComponent,
    CartComponent,
    OrderComponent,
    WishlistComponent,
    OrderedBooksComponent,
   
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatSnackBarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    NgxPaginationModule,
    MatBadgeModule,
    MatRadioModule,


    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
