import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

const userRoute: Routes = [
  {
    path: '',
    component: UserComponent,
    data: { title: 'PRODUCT_MANAGE_PAGE' },
    //  resolve: { product: ProductResolver },
    // canActivate: [AuthSocialGuard],
    // canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(userRoute)

  ]
})
export class UserModule { }
