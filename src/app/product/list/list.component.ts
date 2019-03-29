import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fooditem } from 'src/app/core/model';
import { DbService, Filter } from 'src/app/core/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  fooditems$: Observable<Fooditem[]>;
  filter: Filter;
  showFilter: boolean;

  constructor(public db: DbService, private router: Router) {
    this.db.currentFilter$.subscribe(currentfilter => {
      if (Object.keys(currentfilter).length) {
        this.filter = currentfilter;
        this.showFilter = true;
      } else {
        this.showFilter = false;
      }
    });
  }

  ngOnInit() {
    this.fooditems$ = this.db.fooditems$;
  }

  removeOrderTypeFilter() {
    // this.filter.orderType = null;
    delete this.filter.orderType;
    this.db.applyFilter(this.filter);
  }

  removeIsNonVegFilter() {
    delete this.filter.isNonVeg;
    this.db.applyFilter(this.filter);
  }

  removeCuisineFilter() {
    delete this.filter.cuisine;
    this.db.applyFilter(this.filter);
  }

  removeCategoryFilter() {
    delete this.filter.category;
    this.db.applyFilter(this.filter);
  }

  clearAllFilters() {
    this.db.clearFilters();
    this.showFilter = false;
  }

  navigateToSearchPage() {
    this.router.navigate(['/search']);
  }
}
