import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "src/app/material/material.module";

import { FlexLayoutModule } from '@angular/flex-layout';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ManageComponent } from './manage/manage.component';
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { CanDeactivateGuard } from "src/app/core/can-deactivate.guard";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductService } from "src/app/product/product.service";
import { ProductCardComponent } from './product-card/product-card.component';



const productRoutes: Routes = [
  {
    path: 'manage/:id',
    component: ManageComponent,
    data: { title: 'PRODUCT_MANAGE_PAGE' },
    //  resolve: { product: ProductResolver },
    // canActivate: [AuthSocialGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    data: { title: 'PRODUCT_DETAIL_PAGE' },
    // resolve: { product: ProductResolver },
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    component: ListComponent,
    data: { title: 'PRODUCT_LIST_PAGE' },
   // canActivate: [AuthGuard]
    // resolve: { products: ProductListResolver}
  }
];

@NgModule({
  declarations: [ListComponent, DetailComponent, ManageComponent, ProductCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(productRoutes)
  ],
  providers: [ProductService],

})

export class ProductModule { }
