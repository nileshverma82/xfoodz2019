import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DbService, Filter } from 'src/app/core/db.service';
import { Fooditem } from 'src/app/core/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {
  fooditems$: Observable<Fooditem[]>;
  subscription: Subscription;
  filter: Filter;
  showFilter: boolean;

  constructor(public db: DbService, private router: Router) {
    this.subscription = this.db.currentFilter$.subscribe(currentfilter => {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
