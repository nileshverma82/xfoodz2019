import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { first, switchMap, tap, catchError, shareReplay } from 'rxjs/operators';
import { AppUser } from './models';
import { Fooditem } from './models';
import { SnackbarNotificationService } from './snackbar-notification.service';

export interface Filter {
  orderType?: string;
  isNonVeg?: boolean;
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

  currentFilter$: BehaviorSubject<Filter | null>;
  fooditems$: Observable<Fooditem[]>;
  displayWelcomeMsg: boolean;

  constructor(
    private afs: AngularFirestore,
    private notify: SnackbarNotificationService
  ) {
    this.displayWelcomeMsg = true;
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
          let query: firebase.firestore.Query = ref.orderBy('createdAt', 'desc');
          if (filter.orderType != null) {
            query = query.where('orderType', '==', filter.orderType);
          }
          if (filter.isNonVeg != null) {
            query = query.where('isNonVeg', '==', filter.isNonVeg);
          }
          if (filter.cuisine != null) {
            query = query.where('cuisine', '==', filter.cuisine);
          }
          if (filter.category != null) {
            query = query.where('category', '==', filter.category);
          }
          return query;
        }).valueChanges()
      ),
      shareReplay(),
      catchError( e => {
        console.error(e);
        return throwError(e);
      }));
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
          if (this.displayWelcomeMsg) {
            if (user) {
              this.notify.openSnackBar('Welcome ' + user.displayName);
            } else {
              this.notify.openSnackBar('Welcome Guest');
            }
            this.displayWelcomeMsg = false;
          }
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

  async updateUserData(uid: string, data: any) {
    // Sets user data to firestore on login
    const userRef = this.afs.collection<any>(this.dbAppUserRoot);
    const promise = userRef.doc(uid).update(data);
    await promise.then(
      res => {
        console.log('User data updated!!');
      }, err => {
        console.log('Error during update User: ', err);
      }
    );
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

