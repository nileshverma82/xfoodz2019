import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable, of, BehaviorSubject , combineLatest} from 'rxjs';
import { AppUser, Fooditem } from './models';
import { SnackbarNotificationService } from './snackbar-notification.service';
import { first, tap, switchMap } from 'rxjs/operators';

export interface Filter {
  orderType?: string;
  isNonVeg?: string;
  cuisine?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private dbAppChatRoot = 'appchat';
  private dbAppUserRoot = 'appuser';
  private dbAppTrayRoot = 'apptray';
  private dbProductRoot = 'products';

  // Product filters...
  isNonVegFilter$: BehaviorSubject<boolean|null>;
  categoryFilter$: BehaviorSubject<string|null>;
  cuisineFilter$: BehaviorSubject<string|null>;
  orderTypeFilter$: BehaviorSubject<string|null>;
  currentFilter$: BehaviorSubject<Filter|null>;
  fooditems$: Observable<Fooditem[]>;
  // currentFilter: Filter;

  constructor(
    private afs: AngularFirestore,
    private notify: SnackbarNotificationService
  ) {
    // this.currentFilter = {};
    this.isNonVegFilter$ = new BehaviorSubject(null);
    this.categoryFilter$ = new BehaviorSubject(null);
    this.cuisineFilter$ = new BehaviorSubject(null);
    this.orderTypeFilter$ = new BehaviorSubject(null);
    this.currentFilter$ = new BehaviorSubject({});
    this.fooditems$ = this.getProductList();
  }

  // ..... Firebase getter methods ..... //
  get newFirebaseDocumentKey(): string {
    return this.afs.createId();
  }

  get serverTimestampFromFirestore() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }


  getProductList(): Observable<Fooditem[]> {
    return this.currentFilter$.pipe(
      switchMap((filter) =>
        this.afs.collection<Fooditem>(this.dbProductRoot, ref => {
          let query: firebase.firestore.Query = ref;
          if (filter.orderType != null) {
            query = query.where('orderType', '==', filter.orderType);
          }
          if (filter.isNonVeg != null) {
            query = query.where('isNonVeg', '==', filter.isNonVeg === 'Non-Veg');
          }
          if (filter.cuisine != null) {
            query = query.where('cuisine', '==', filter.cuisine);
          }
          if (filter.category != null) {
            query = query.where('category', '==', filter.category);
          }
          return query;
        }).valueChanges()
      ));
  }

  applyFilter(filter: Filter) {
    this.currentFilter$.next(filter);
  }

  clearFilters() {
    this.currentFilter$.next({});
  }

  getProductByID(productId: string): Observable<Fooditem> {
    const productDoc = `${this.dbProductRoot}/${productId}`;
    return this.afs.doc<Fooditem>(productDoc).valueChanges();
  }

  getProductsByUser(): Observable<Fooditem[]> {
    return of(null);
  }

  async createProduct(fooditem: Fooditem, docID: string) {
    const productRef = this.afs.collection(this.dbProductRoot);
    const promise = productRef.doc(docID).set(fooditem);

    await promise.then(res => {
      console.log('New fooditem created!!');
    }, err => {
      console.log('Error during create fooditem: ', err);
    });

  }

  updateProduct(fooditem: Fooditem): Promise<any> {
    const productDoc = `${this.dbProductRoot}/${fooditem.id}`;
    return this.afs.doc<Fooditem>(productDoc).update(fooditem);
  }

  deleteProduct(id: string): Promise<any> {
    const productDoc = `${this.dbProductRoot}/${id}`;
    return this.afs.doc<Fooditem>(productDoc).delete();
  }

  // ..... App User ..... //
  getUser(uid: string): Observable<AppUser> {
    const userDoc = `${this.dbAppUserRoot}/${uid}`;
    return this.afs
      .doc<AppUser>(userDoc)
      .valueChanges()
      .pipe(
        first(),
        tap(user => {
          this.notify.openSnackBar('Welcome ' + user.displayName);
        })
      );
  }

  async addUpdateUser(userData: AppUser): Promise<void> {
    const userDoc = `${this.dbAppUserRoot}/${userData.uid}`;
    const userRef: AngularFirestoreDocument<AppUser> = this.afs.doc(userDoc);
    return userRef
      .set(userData, { merge: true })
      .then(_ => {
        this.notify.openSnackBar(userData.displayName + 'saved!!');
      })
      .catch(e => {
        console.log('Error: User not created' + e);
      });
  }

  async deleteUser(uid: string) {
    const userDoc = `${this.dbAppUserRoot}/${uid}`;
    const userRef: AngularFirestoreDocument<AppUser> = this.afs.doc(userDoc);
    userRef
      .delete()
      .then(_ => this.notify.openSnackBar('Account deleted!!'))
      .catch(e => console.log('Error while deleting user: ', uid));
  }
}
