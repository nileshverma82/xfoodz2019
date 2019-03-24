import { Location } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UIService } from 'src/app/core/ui.service';
// import { AppCartService } from '../../app-cart/app-cart.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})

export class AppToolbarComponent implements OnInit, OnChanges {

  @Input() sidenavRef: any;
  cartSize: number;
  hideCartBadge: boolean;

  constructor(
    // public cartService: AppCartService,
    public ui: UIService,
    private location: Location,
    private route: Router
  ) {
    // this.cartService.getCartSize$.subscribe(
    //   size => {
    //     this.cartSize = size;
    //     if (size > 0) {
    //       this.hideCartBadge = false;
    //     } else {
    //       this.hideCartBadge = true;
    //     }
    //   });
  }

  ngOnInit() { }

  ngOnChanges() {

  }

  goBack() {
    this.location.back();
  }

}
