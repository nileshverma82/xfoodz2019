import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "src/app/shared/snack-bar/snack-bar.component";
import { Observable, of } from "rxjs";
import { MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string): Observable<any> {


    console.log('from Notification service');
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.data = {message};
    const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, snackBarConfig);

    return of(null);
  }
}
