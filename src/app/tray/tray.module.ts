import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrayComponent } from './tray/tray.component';
import { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

const TrayRoutes: Route  = [

  {
    path: '',
    component: TrayComponent,
    data: { title: 'PRODUCT_LIST_PAGE' },
    // canActivate: [AuthGuard]
    // resolve: { products: ProductListResolver}
  }
]
@NgModule({
  declarations: [TrayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TrayRoutes)

  ]
})
export class TrayModule { }
