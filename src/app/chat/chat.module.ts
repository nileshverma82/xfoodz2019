import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { MaterialModule } from '../material/material.module';
import { ProductResolver } from '../product/product.resolver';
import { ChatComponent } from './chat/chat.component';
import { OrderResolver } from './order.resolver';

const chatRoute: Routes = [
  {
    path: ':id',
    component: ChatComponent,
    data: { title: 'APP_CHAT_PAGE' },
    resolve: { order: OrderResolver },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule.forChild(chatRoute)

  ],
  providers: [ProductResolver]

})
export class ChatModule { }
