import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCartComponent } from './app-cart/app-cart.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { DialogCheckoutComponent } from './dialog-checkout/dialog-checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderReviewComponent } from './order-review/order-review.component';
import { MaterialModule } from '../material/material.module';

const appCartRoutes: Routes = [
  {
    path: ':id',
    component: OrderReviewComponent,
    canActivate: [AuthGuard],
    data: { title: 'ORDER_REVIEW_PAGE' }
  },
  {
    path: '',
    component: AppCartComponent,
    canActivate: [AuthGuard],
    data: { title: 'APP_CART_PAGE' }
  },
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(appCartRoutes),
  ],
  declarations: [AppCartComponent, CartListComponent, DialogCheckoutComponent, OrderReviewComponent],
  entryComponents: [DialogCheckoutComponent]
})
export class AppCartModule { }
