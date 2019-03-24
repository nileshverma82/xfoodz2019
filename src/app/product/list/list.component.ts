import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fooditem } from 'src/app/core/model';
import { DbService } from 'src/app/core/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  fooditem$: Observable<Fooditem[]>;
  constructor(private db: DbService, private router: Router) { }

  ngOnInit() {
    this.fooditem$ = this.db.getProductList();
  }

  navigateToSearchPage() {
    this.router.navigate(['/search']);
  }

}
