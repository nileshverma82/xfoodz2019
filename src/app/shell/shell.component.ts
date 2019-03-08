import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  navList = [
    { menuIcon: 'home', menuName: 'Home', menuRoute: '/' },
    { menuIcon: 'assignment', menuName: 'My Orders', menuRoute: '/checkout' },
    { menuIcon: 'shopping_cart', menuName: 'Cart', menuRoute: '/tray' },
    { menuIcon: 'favorite', menuName: 'Wish List', menuRoute: '/wishlist' },
    { menuIcon: 'account_circle', menuName: 'Profile', menuRoute: '/user' },
    { menuIcon: 'language', menuName: 'Language', menuRoute: './' },
    { menuIcon: 'android', menuName: 'Download App', menuRoute: './' },
    { menuIcon: 'help', menuName: 'Help', menuRoute: './' },
    { menuIcon: 'feedback', menuName: 'Feedback', menuRoute: './' },

  ];
}
