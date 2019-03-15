import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/product/product.service";
import { Observable } from "rxjs";
import { Fooditem } from "src/app/core/model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  fooditem: Fooditem;
  fooditemlist: Observable<Fooditem[]>;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.fooditemlist = this.productService.getProductList();
    console.log(this.fooditemlist)
  }

}
