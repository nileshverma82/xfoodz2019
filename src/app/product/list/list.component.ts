import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fooditem } from 'src/app/core/model';
import { DbService } from 'src/app/core/db.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  fooditem$: Observable<Fooditem[]>;
  constructor(private db: DbService) { }

  ngOnInit() {
    this.fooditem$ = this.db.getProductList();
  }

}
