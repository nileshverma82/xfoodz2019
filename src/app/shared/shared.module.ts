import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { MaterialModule } from "src/app/material/material.module";

@NgModule({
  declarations: [DialogConfirmComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MaterialModule
  ],
  exports: []
})
export class SharedModule { }
