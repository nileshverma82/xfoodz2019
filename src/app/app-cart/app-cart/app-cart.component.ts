import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, switchMap } from '../../../../node_modules/rxjs/operators';
import { AuthService } from '../../core/auth.service';
import { ICartDoc } from '../app-cart.model';
import { AppCartService } from '../app-cart.service';
import { DialogCheckoutComponent } from '../dialog-checkout/dialog-checkout.component';

@Component({
  selector: 'app-app-cart',
  templateUrl: './app-cart.component.html',
  styleUrls: ['./app-cart.component.scss']
})

export class AppCartComponent implements OnInit {
  cart: { id: string, name: string };
  cartID: string;
  orders$: Observable<ICartDoc[]>;

  constructor(
    public cartService: AppCartService,
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cartID = this.auth.currUser.uid;
    this.orders$ = this.cartService.getAllOrders$(this.cartID);

    /* [Below code with switchMap not required as AuthGuard handles currentUser issue.]
      this.orders$ = this.auth.currUser$.pipe(
      switchMap(user => {
        this.cart = { id: user.uid, name: user.displayName };
        this.cartID = user.uid;
        return this.cartService.getAllOrders$(this.cartID);
      })
    );
    */
  }

  updateOrder(order: { id: string, dataToUpdate: { qty: number, amtPayable: number } }) {
    if (order.dataToUpdate.qty === 0) {
      this.cartService.removeOrder(this.cartID, order.id);
    } else {
      this.cartService.updateOrder(this.cartID, order.id, order.dataToUpdate);
    }
  }

  removeOrder(orderID: string) {
    // doc().delete() - Does not delete any nested collections.
    // First delete nested collection, and then delete the document.
    this.cartService.removeOrder(this.cartID, orderID);
  }

  fabAction(event) {
    if (event === 'add') {
      this.router.navigate(['/']);
    } else {
      console.log('TODO: Navigate to checkout component.');
    }
  }

  onClickCheckout(orderID: string, name: string) {
    const dialogRef = this.dialog.open(
      DialogCheckoutComponent,
      { data: { cod: true, online: false }
    });

    dialogRef.afterClosed().pipe(first()).subscribe( data => {
        if (data) {
          this.cartService.updateOrder(this.cartID, orderID, {
            paymentOption: data.paymentMethod,
            deliveryOption: data.deliveryMethod
          });
          this.router.navigate(['cart', orderID]);
        } else {
          return of(null);
        }
    });
  } // onClickCheckout

}
