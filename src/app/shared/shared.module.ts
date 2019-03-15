import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { MaterialModule } from "src/app/material/material.module";
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  declarations: [DialogConfirmComponent, SnackBarComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MaterialModule
  ],
  exports: [],
  entryComponents: [
    DialogConfirmComponent,
    SnackBarComponent
  ]
})
export class SharedModule { }
