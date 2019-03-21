import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { ProductCardComponent } from './product-card/product-card.component';

const SHARED_COMPONENTS = [
  DialogConfirmComponent,
  ProductCardComponent
];

@NgModule({
  declarations: [
    DialogConfirmComponent,
    ProductCardComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MaterialModule
  ],
  exports: [SHARED_COMPONENTS],
  entryComponents: [
    DialogConfirmComponent
  ]
})
export class SharedModule { }
