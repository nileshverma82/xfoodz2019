import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Fooditem } from 'src/app/core/model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() fooditem: Fooditem;
  star: number[];

  constructor() {
   this.star = [1, 2, 3, 4, 5];
  }
  ngOnInit() {
  }

}
