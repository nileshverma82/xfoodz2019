import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fab-action',
  template: `
    <button mat-fab class="mat-elevation-z8"
      (click)="fabActionEvent.emit(fabIcon)">
      <mat-icon>{{fabIcon}}</mat-icon>
    </button>
  `,
  styles: []
})
export class FabActionComponent implements OnInit {

  @Input() fabIcon: string;
  @Output() fabActionEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
