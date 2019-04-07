import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { DbService, Filter } from 'src/app/core/db.service';
import { Fooditem } from 'src/app/core/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  fooditem: Fooditem;
  orders: string[];
  cuisines: string[];
  categories: string[];
  filterForm: FormGroup;
  subscription: Subscription;
  filterSubscription: Subscription;

  constructor(
    private db: DbService,
    private router: Router,
    private fb: FormBuilder) {
    this.orders = [];
    this.cuisines = [];
    this.categories = [];
    this.filterSubscription = this.db.currentFilter$.subscribe(filters => {
      this.filterForm = this.createFormGroup(filters);
    });
  }

  createFormGroup(filters: Filter) {
    return this.fb.group({
      orderType: filters.orderType,
      isNonVeg: filters.isNonVeg,
      cuisine: filters.cuisine,
      category: filters.category
    });
  }

  ngOnInit() {
    // Get distinct cuisines
    this.subscription = this.db.fooditems$.pipe(
      flatMap((fooditems: Fooditem[]) => fooditems),
    ).subscribe(fi => {
        this.fooditem = fi;
        if (this.orders.indexOf(fi.orderType) === -1) {
          this.orders.push(fi.orderType);
        }

        if (this.cuisines.indexOf(fi.cuisine) === -1) {
          this.cuisines.push(fi.cuisine);
        }

        if (this.categories.indexOf(fi.category) === -1) {
          this.categories.push(fi.category);
        }
      });
  }

  applySearch(filter: Filter) {
    // Remove properties with NULL values
    Object.keys(filter).forEach((key) => (filter[key] == null) && delete filter[key]);
    this.db.applyFilter(filter);
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }
}
