import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from '../chat/chat/chat.component';
import { AuthSocialGuard } from '../core/auth-social.guard';


const adminRoute: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { title: 'PRODUCT_ADMIN_PAGE' },
    // canActivate: [AuthSocialGuard]
  }
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoute)
  ]
})
export class AppAdminModule { }
