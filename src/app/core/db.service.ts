import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AppUser, Fooditem } from './models';
import { SnackbarNotificationService } from './snackbar-notification.service';
import { first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private dbAppChatRoot = 'appchat';
  private dbAppUserRoot = 'appuser';
  private dbAppTrayRoot = 'apptray';
  private dbProductRoot = 'products';

  constructor(
    private afs: AngularFirestore,
    private notify: SnackbarNotificationService
  ) {}

  // ..... Firebase getter methods ..... //
  get newFirebaseDocumentKey(): string {
    return this.afs.createId();
  }

  get serverTimestampFromFirestore() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  // ..... Products ..... //
  getProductList(): Observable<Fooditem[]> {
    return this.afs.collection<Fooditem>
      (this.dbProductRoot, ref => ref.orderBy('createdAt', 'desc')).valueChanges();
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
