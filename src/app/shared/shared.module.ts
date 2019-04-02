import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FabActionComponent } from './fab-action/fab-action.component';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from './truncate.pipe';
import { ImageManagerComponent } from './image-manager/image-manager.component';

const SHARED_COMPONENTS = [
  AppToolbarComponent,
  DialogConfirmComponent,
  FabActionComponent,
  ImageManagerComponent,
  ProductCardComponent,
  TruncatePipe
];

@NgModule({
  declarations: [
    DialogConfirmComponent,
    ProductCardComponent,
    FabActionComponent,
    AppToolbarComponent,
    TruncatePipe,
    ImageManagerComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LayoutModule,
    MaterialModule,
    RouterModule
  ],
  exports: [SHARED_COMPONENTS],
  entryComponents: [
    DialogConfirmComponent
  ]
})
export class SharedModule { }
