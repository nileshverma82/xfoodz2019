import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from "src/app/shell/shell.component";

const routes: Routes = [
  {
    path: '', component: ShellComponent, data: { title: 'APP_SHELL_PAGE' },
    children: [
      { path: 'app-tray', loadChildren: './tray/tray.module#TrayModule' },
      { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule' },
     // { path: 'chat', loadChildren: './app-chat/app-chat.module#AppChatModule' },
      { path: 'search', loadChildren: './search/search.module#SearchModule' },
      { path: 'app-user', loadChildren: './app-user/app-user.module#AppUserModule' },
      { path: '', loadChildren: './product/product.module#ProductModule' },

    ]
  },
  // { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
 // { path: 'home', component: HomeComponent, data: { title: 'APP_HOME_PAGE' } },
  { path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInModule' },
  { path: '', redirectTo: '', pathMatch: 'full' },
 // { path: '**', component: PageNotFoundComponent, data: { title: 'PAGE_NOT_FOUND_PAGE' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
