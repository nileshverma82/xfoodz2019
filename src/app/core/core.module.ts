import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService } from "src/app/core/notifications.service";
import { DialogConfirmService } from "src/app/core/dialog-confirm.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [NotificationsService, DialogConfirmService]
})
export class CoreModule { }
