import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { AppCartService } from '../app-cart.service';
import { DialogCheckoutComponent, DialogData } from '../dialog-checkout/dialog-checkout.component';
import { ICartDoc } from '../app-cart.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-app-cart',
  templateUrl: './app-cart.component.html',
  styleUrls: ['./app-cart.component.scss']
})

export class AppCartComponent implements OnInit {
  cart: {id: string, name: string};
  cartID: string;
  orders$: Observable<ICartDoc[]>;


  constructor(
    public cartService: AppCartService,
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.cart = { id: this.auth.currUser.uid, name: this.auth.currUser.displayName };
    this.cartID = this.auth.currUser.uid;
  }

  ngOnInit() {
    // Create Observable of all orders...
    this.orders$ = this.cartService.getAllOrders$(this.cartID);
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

  navigateToChatRoute(sellerID: string) {
    console.log('navigateToChatRoute(sellerID): ', sellerID);
    console.log('navigateToChatRoute(buyerID): ', this.cartID);
  }

  fabAction(event) {
    if (event === 'add') {
      this.router.navigate(['/']);
    } else {
      console.log('TODO: Navigate to checkout component.');
    }
  }

  onClickCheckout(orderID: string, name: string) {
    const dialogRef = this.dialog.open(DialogCheckoutComponent, {
      data: { cod: true, online: false }
    });

    // dialogRef.afterClosed().subscribe((data: DialogData) => {
    //   if (data) {
    //     console.log('Proceed to checkout: ', data);
    //     this.cartService.checkoutOrder(
    //       this.cart,
    //       {id: orderID, name: name},
    //       data.paymentMethod,
    //       data.deliveryMethod
    //     ).subscribe(
    //       checkedoutOrder => {
    //         this.afs.collection('checkout').add(checkedoutOrder)
    //           .then(() => {
    //             console.log('Order Checked out successfully');
    //             this.cartService.removeAllProducts(this.cartID, orderID)
    //               .then(() => {
    //                 this.cartService.removeOrder(this.cartID, orderID);
    //               });
    //             this.router.navigate(['/checkout']);
    //           })
    //           .catch(e => console.log('Error in order checkout: ', e));
    //       }
    //     );
    //   } else {
    //     console.log('Checkout cancelled');
    //   }
    // });
  }

}
