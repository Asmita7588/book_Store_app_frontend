import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { GetAllBookComponent } from './components/get-all-book/get-all-book.component';
import { ViewBookComponent } from './components/view-book/view-book.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { OrderedBooksComponent } from './components/ordered-books/ordered-books.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  {
    path: 'dashboard',
     component: DashboardComponent,
     canActivate: [AuthGuardService],
     children: [{ path: 'books', component: GetAllBookComponent },
      {path: '', redirectTo: '/books', pathMatch: 'full' },
      { path: 'viewbook', component: ViewBookComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order', component: OrderComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'orders', component: OrderedBooksComponent },
     ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


