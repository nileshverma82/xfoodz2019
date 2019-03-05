import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Observable } from "rxjs";
import { DialogConfirmComponent } from "src/app/shared/dialog-confirm/dialog-confirm.component";

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmService {

  constructor(private dialog: MatDialog) { }

  openDialog(dialogMsg: string): Observable<any> {

    const dialogConfig = new MatDialogConfig();

    // Disable user to escape or click outside to close dialog.
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    // Passing data to DialogComponent
    dialogConfig.data = { dialogMessage: dialogMsg };

    const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);

    return dialogRef.afterClosed();
  }
  
}
