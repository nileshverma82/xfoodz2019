import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from "src/app/checkout/checkout/checkout.component";
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";

const checkoutRoute: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    data: { title: 'PRODUCT_MANAGE_PAGE' },
    //  resolve: { product: ProductResolver },
    // canActivate: [AuthSocialGuard],
    // canDeactivate: [CanDeactivateGuard]
  }
]

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(checkoutRoute)

  ]
})
export class CheckoutModule { }
