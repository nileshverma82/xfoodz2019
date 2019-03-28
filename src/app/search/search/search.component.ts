import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/core/db.service';
import { flatMap, map, distinct, tap } from 'rxjs/operators';
import { Fooditem } from 'src/app/core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public cuisines: string[];

  locationFromNavigator: { lat: number; lng: number };

  constructor(private db: DbService, private router: Router ) {
    this.cuisines = [];
    // Setting up default location
    this.locationFromNavigator = { lat: 1.3522174, lng: 103.87970299999999 };
  }

  ngOnInit() {
    // Get distinct cuisines
    this.db
      .getProductList()
      .pipe(
        flatMap((fooditems: Fooditem[]) => fooditems),
        map(fooditem => fooditem.cuisine),
        distinct(),
        tap(fi => console.log(fi))
      )
      .subscribe(fi => {
        this.cuisines.push(fi);
      });

    // this.geoLocations$ = this.firestore.getProducts$(2);
  }



  applySearch() {
    this.db.isNonVegFilter$.next(true);
    this.router.navigateByUrl('/');
  }
}
