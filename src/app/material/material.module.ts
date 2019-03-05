import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule } from '@angular/material'

@NgModule({
  declarations: [],
  imports: [
    
    // MatProgressSpinnerModule,
    // MatToolbarModule, 
    // MatButtonModule, 
    // MatSidenavModule, 
    // MatIconModule, 
    // MatListModule,
    // MatDialogModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatProgressSpinnerModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatSidenavModule, 
    MatIconModule, 
    MatListModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
