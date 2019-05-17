import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { AuthGuard } from '../core/auth.guard';
import { SharedModule } from '../shared/shared.module';

const userRoute: Routes = [
  {
    path: ':id',
    component: UserComponent,
    data: { title: 'APP_USER_PAGE' },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    RouterModule.forChild(userRoute)

  ]
})
export class UserModule { }
