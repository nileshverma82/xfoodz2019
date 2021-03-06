import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

export interface AppToolbar {
  pageTitle?: string;
  showSideNavToggleIcon?: boolean;
  showNewProductIcon?: boolean;
  showAppTrayIcon?: boolean;
  showCancelIcon?: boolean;
  showGoBackIcon?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UIService {

  defaultToolbar: AppToolbar = {
    pageTitle: 'Foodz9',
    showSideNavToggleIcon: true,
    showNewProductIcon: true,
    showAppTrayIcon: true
  };

  appToolBar$ = new BehaviorSubject<AppToolbar>(this.defaultToolbar);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          let child = route;

          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
              route = child;
            } else {
              child = null;
            }
          }
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(routerData => {
        this.setPageLayout(routerData);
      });
  }

  setPageLayout(routerData: any) {
    switch (routerData.title) {
      case 'APP_HOME_PAGE':
        this.appToolBar$.next({ pageTitle: 'Foodz9', showSideNavToggleIcon: true });
        break;
      case 'PRODUCT_LIST_PAGE':
        this.appToolBar$.next(this.defaultToolbar);
        break;
      case 'PRODUCT_DETAIL_PAGE':
        this.appToolBar$.next({
          pageTitle: routerData.product.title,
          showCancelIcon: true
        });
        break;
      case 'PRODUCT_MANAGE_PAGE':
        if (routerData.product) {
          this.appToolBar$.next({
            pageTitle: `${routerData.product.title}*`,
            showCancelIcon: true
          });
        } else {
          this.appToolBar$.next({
            pageTitle: 'New Fooditem*',
            showCancelIcon: true
          });
        }
        break;
      case 'APP_CART_PAGE':
        this.appToolBar$.next({ pageTitle: 'My Cart', showCancelIcon: true });
        break;
      case 'APP_CHECKOUT_PAGE':
        this.appToolBar$.next({ pageTitle: 'My Orders', showCancelIcon: true });
        break;
      case 'ORDER_REVIEW_PAGE':
        this.appToolBar$.next({ pageTitle: 'Order summary', showCancelIcon: true });
        break;
      case 'APP_SEARCH_PAGE':
        this.appToolBar$.next({ pageTitle: 'Search', showCancelIcon: true });
        break;
      case 'APP_CHAT_PAGE':
        this.appToolBar$.next({
          pageTitle: `${routerData.order.seller.name}`,
          showCancelIcon: true });
        break;
      case 'APP_USER_PAGE':
        this.appToolBar$.next({
          pageTitle: 'Account Info',
          showCancelIcon: true
        });
        break;
      default:
        this.appToolBar$.next(this.defaultToolbar);
        break;
    }
  }
}
