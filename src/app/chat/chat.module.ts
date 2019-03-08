import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";

const chatRoute: Routes = [
  {
    path: '',
    component: ChatComponent,
    data: { title: 'PRODUCT_MANAGE_PAGE' },
    //  resolve: { product: ProductResolver },
    // canActivate: [AuthSocialGuard],
    // canDeactivate: [CanDeactivateGuard]
  }
]

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(chatRoute)

  ]
})
export class ChatModule { }
