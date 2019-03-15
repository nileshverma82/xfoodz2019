import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material";
import { SnackBarComponent } from "src/app/shared/snack-bar/snack-bar.component";
import { NotificationsService } from "src/app/core/notifications.service";


@Component({
  selector: 'app-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.scss']
})
export class TrayComponent implements OnInit {

  constructor(private notificationService: NotificationsService) { }

  openSnackBar1() {
    this.notificationService.openSnackBar('Added to Tray');
   // this.snackBar.open('Item Added to Try', 'UNDO', { horizontalPosition: 'center', duration: 3000} );
  }
  ngOnInit() {

  }

}
