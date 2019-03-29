import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { DbService, Filter } from 'src/app/core/db.service';
import { Fooditem } from 'src/app/core/models';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public cuisines: string[];
  public categories: string[];

  filterForm: FormGroup;

  locationFromNavigator: { lat: number; lng: number };

  constructor(private db: DbService, private router: Router, private fb: FormBuilder ) {
    this.cuisines = [];
    this.categories = [];
    this.filterForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.fb.group({
      orderType: null,
      isNonVeg: null,
      cuisine: null,
      category: null
    });
  }



  ngOnInit() {
    // Get distinct cuisines
    this.db
      .getProductList()
      .pipe(
        flatMap((fooditems: Fooditem[]) => fooditems),
      )
      .subscribe(fi => {
        if (this.cuisines.indexOf(fi.cuisine) === -1) {
          this.cuisines.push(fi.cuisine);
        }

        if (this.categories.indexOf(fi.category) === -1) {
          this.categories.push(fi.category);
        }
      });
  }

  applySearch(filter) {
    // Remove properties with NULL values
    Object.keys(filter).forEach((key) => (filter[key] == null) && delete filter[key]);
    this.db.applyFilter(filter);
    this.router.navigateByUrl('/');
  }
}
