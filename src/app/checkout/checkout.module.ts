import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from 'src/app/checkout/checkout/checkout.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DialogCancellationComponent } from './dialog-cancellation/dialog-cancellation.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderlListComponent } from './orderl-list/orderl-list.component';
import { AuthGuard } from '../core/auth.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const checkoutRoute: Routes = [
  {
    path: 'history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard],
    data: { title: 'ORDER_HISTORY' }
  },
  {
    path: '',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: { title: 'APP_CHECKOUT_PAGE' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(checkoutRoute)
  ],
  declarations: [CheckoutComponent, DialogCancellationComponent, OrderHistoryComponent, OrderlListComponent],
  entryComponents: [DialogCancellationComponent]
})
export class CheckoutModule { }
