import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Fooditem } from 'src/app/core/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  fooditem: Fooditem;
  fabActionIcon: string;

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // tslint:disable-next-line:no-string-literal
    this.fooditem = this.route.snapshot.data['product'];
  }


  ngOnInit() {

    // this.fooditemImageCount = this.fooditem.images.length;
    // this.preview = this.fooditem.images[0].url;
  }

  onClickFab(action: string) {
    switch (action) {
      case 'add':
        console.log('onClickFab: ', action);
        // console.log('case: add:', this.auth.currentAppUser);
        // this.cartService.manageProduct(this.auth.currentAppUser.uid, this.fooditem);
        this.router.navigate(['tray']);
        break;
      case 'edit':
        console.log('onClickFab: ', action);
        this.router.navigate(['manage', this.fooditem.id]);
        break;
      default:
        console.log('onClickFab: ', action);
        this.router.navigate(['tray']);
        // this.fabActionIcon = 'add';
        break;
    }
  }

  ngOnDestroy() {
    console.log('#### DetailComponent: Destroyed');
  }

  // }


}
