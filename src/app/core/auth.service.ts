import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { AppUser } from './models';
import { SnackbarNotificationService } from './snackbar-notification.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currUser$: Observable<AppUser | null>;
  currUser: AppUser|null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private notify: SnackbarNotificationService,
    private db: DbService
  ) {
    this.currUser$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.getUser(user.uid).pipe(
            first(),
            tap(cu => {
              this.currUser = cu;
            })
          );
        } else {
          this.currUser = null;
          return of(null);
        }
      }),
      tap(user => localStorage.setItem('app-user', JSON.stringify(user))),
      // startWith(JSON.parse(localStorage.getItem('app-user')))
    );
  }

  getUser(): Promise<AppUser> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  loginAnonymously(): Promise<void> {
    console.log('#Event: loginAnonymously()#');
    return this.afAuth.auth.signInAnonymously()
      .then((credential: firebase.auth.UserCredential) => {
        console.log(credential);
        const anomymousUser: AppUser = {
          uid: credential.user.uid,
          isAnonymous: credential.user.isAnonymous,
          displayName: 'Guest',
          photoURL: 'anonymous-user'
        };

        // Save user data to fireabase...
        console.log('loginAnonymously(): Sign in successfull...');
        return this.db.addUpdateUser(anomymousUser);

      })
      .catch(
        (e: firebase.FirebaseError) => {
          this.handleAuthErrors(e);
        });
  }

  async googleSignin() {
    try {
      const provider = new auth.GoogleAuthProvider();
      const credential: firebase.auth.UserCredential = await this.afAuth.auth.signInWithPopup(
        provider
      );
      // Prepare user data //
      const googleUser: AppUser = {
        uid: credential.user.uid,
        isAnonymous: credential.user.isAnonymous,
        displayName: credential.user.displayName,
        email: credential.user.email,
        photoURL: credential.user.photoURL,
        providerId: credential.user.providerId,
        phoneNumber: credential.user.phoneNumber
      };
      this.db.addUpdateUser(googleUser);
    } catch (e) {
      this.handleAuthErrors(e);
    }
  }

  upgradeAnonymousUser() {
    // TODO: Upgrade anonymous user to google.
  }


  async signOut() {
    await this.afAuth.auth.signOut();
    this.notify.openSnackBar('We will miss you!');
    this.router.navigate(['/']);
  }


  handleAuthErrors(e: firebase.FirebaseError) {
    this.notify.openSnackBar(e.code);
    // Firebase Auth Error Codes...
    // auth/app-deleted
    // auth/app-not-authorized
    // auth/argument-error
    // auth/invalid-api-key
    // auth/invalid-user-token
    // auth/network-request-failed
    // auth/operation-not-allowed
    // auth/requires-recent-login
    // auth/too-many-requests
    // auth/unauthorized-domain
    // auth/user-disabled
    // auth/user-token-expired
    // auth/web-storage-unsupported
    switch (e.code) {
      case 'auth/operation-not-allowed':
        console.log('Error:... auth not enabled in the Firebase Console.');
        break;
      default:
        console.error('Error:...', e.code);
        console.error('Error:...', e.message);
        break;
    }

  }
}
