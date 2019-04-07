import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

const signInRoutes: Routes = [
  { path: '', component: SignInComponent, data: { title: 'SIGN_IN_PAGE' } }
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(signInRoutes),
  ],
  declarations: [SignInComponent],
  exports: [SignInComponent]
})
export class SignInModule { }
