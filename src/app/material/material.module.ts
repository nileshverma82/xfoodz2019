import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatSnackBarModule, MatCardModule } from '@angular/material'

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
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule

  ]
})
export class MaterialModule { }
