import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from 'src/app/shell/shell.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: ShellComponent, data: { title: 'APP_SHELL_PAGE' },
    children: [
      { path: 'cart', loadChildren: './app-cart/app-cart.module#AppCartModule' },
      { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule' },
      { path: 'chat', loadChildren: './chat/chat.module#ChatModule' },
      { path: 'search', loadChildren: './search/search.module#SearchModule' },
      { path: 'user', loadChildren: './user/user.module#UserModule' },
      { path: 'admin', loadChildren: './app-admin/app-admin.module#AppAdminModule' },
      { path: '', loadChildren: './product/product.module#ProductModule' },
    ]
  },
  // { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'home', component: HomeComponent, data: { title: 'APP_HOME_PAGE' } },
  { path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInModule' },
  { path: '', redirectTo: '', pathMatch: 'full' },
 { path: '**', component: PageNotFoundComponent, data: { title: 'PAGE_NOT_FOUND_PAGE' } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
