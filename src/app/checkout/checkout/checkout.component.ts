import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICheckout } from 'src/app/app-cart/app-cart.model';
import { AuthService } from 'src/app/core/auth.service';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { CheckoutService } from '../checkout.service';

export interface IOrderState {
  state: string;
  updatedAt: Date;
  reason?: string;
  additionalComments?: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkedoutOrders$: Observable<ICheckout[]>;
  receivedOrders$: Observable<ICheckout[]>;
  currentUser: any;
  // orderStates = ['Confirmed', 'Rejected', 'Partially Accepted'];

  constructor(
    public dialog: MatDialog,
    private checkoutService: CheckoutService,
    private auth: AuthService) {
    this.currentUser = this.auth.currUser.uid;
  }

  ngOnInit() {
    this.checkedoutOrders$ = this.checkoutService.ordersPlaced(this.currentUser)
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
        ));

    this.receivedOrders$ = this.checkoutService.ordersReceived(this.currentUser)
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
        ));
  }

}
