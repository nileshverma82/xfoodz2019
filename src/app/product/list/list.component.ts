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

  fooditems$: Observable<Fooditem[]>;
  constructor(public db: DbService, private router: Router) {
    this.db.filterByCategory();
   }

  ngOnInit() {
    this.fooditems$ = this.db.fooditems$;
  }

  navigateToSearchPage() {
    this.router.navigate(['/search']);
  }

}
