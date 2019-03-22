import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FabActionComponent } from './fab-action/fab-action.component';

const SHARED_COMPONENTS = [
  DialogConfirmComponent,
  FabActionComponent,
  ProductCardComponent
];

@NgModule({
  declarations: [
    DialogConfirmComponent,
    ProductCardComponent,
    FabActionComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LayoutModule,
    MaterialModule
  ],
  exports: [SHARED_COMPONENTS],
  entryComponents: [
    DialogConfirmComponent
  ]
})
export class SharedModule { }
