import { Injectable } from '@angular/core';
import { DbService } from '../core/db.service';
import { constructor, delay } from 'q';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { resolve } from 'url';
import { state } from '@angular/animations';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<any> {

  constructor(
    private db: DbService,
    private router: Router,
    private afs: AngularFirestore) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.getOrderByID(id).pipe(
      tap (() => console.log('From resolver: ', id)),
     // delay(2000), // added a delay to test loading spinner. To be removed later.
      take(1)
    );
    }

  getOrderByID(id: string): any {
    const orderref = this.afs.collection('checkout');
    return orderref.doc(id).valueChanges();
  }
}
