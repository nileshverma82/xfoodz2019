import { Component, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { Inject } from "@angular/core";
import { MatSnackBarRef } from "@angular/material/snack-bar";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  snackBarMessage: any;

  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any, private snackBarRef: 
              MatSnackBarRef<SnackBarComponent>) {
    this.snackBarMessage = data.message; 
    console.log('snack-bar Data: ', data);
   }
  
  ngOnInit() {
  }

}
