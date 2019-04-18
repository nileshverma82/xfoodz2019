import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductResolver } from '../product/product.resolver';
import { AuthSocialGuard } from '../core/auth-social.guard';
import { CanDeactivateGuard } from '../core/can-deactivate.guard';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { OrderResolver } from './order.resolver';

const chatRoute: Routes = [
  {
    path: ':id',
    component: ChatComponent,
    data: { title: 'PRODUCT_MANAGE_PAGE' },
    resolve: { order: OrderResolver },
    canActivate: [AuthSocialGuard],
    // canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(chatRoute)

  ],
  providers: [ProductResolver]

})
export class ChatModule { }
