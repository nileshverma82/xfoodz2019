import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";

const loginRoute: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'PRODUCT_MANAGE_PAGE' },
    //  resolve: { product: ProductResolver },
    // canActivate: [AuthSocialGuard],
    // canDeactivate: [CanDeactivateGuard]
  }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoute)
  ]
})
export class LoginModule { }
