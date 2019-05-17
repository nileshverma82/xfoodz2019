import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { IGeoInfo } from '../core/models';
import { DbService } from '../core/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userId: string;
  geo: IGeoInfo;

  constructor(
    private auth: AuthService,
    private router: Router,
    private db: DbService) {
    this.userId = null;
  }

  ngOnInit() {
    this.auth.currUser$.pipe(
      first()
    ).subscribe( user => {
      if (user) {
        console.log('User logged in >>>', user);
        this.userId = user.uid;
      } else {
        console.log('No user currently logged in >>>', user);
      }
    });
  }

  addAnonymousUserWithGeo(geo: IGeoInfo) {
    this.auth.loginAnonymously(geo).then (() => {
      this.router.navigate(['/']);
    });
  }

  onClickDone() {
    this.addAnonymousUserWithGeo(this.geo);
    console.log('data from map: ', this.geo);
  }

  getAddress(add) {
    this.geo = add;
  }

}
