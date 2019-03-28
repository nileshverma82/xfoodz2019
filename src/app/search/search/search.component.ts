import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/core/db.service';
import { flatMap, map, distinct, tap } from 'rxjs/operators';
import { Fooditem } from 'src/app/core/models';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
import { Router } from "@angular/router";
>>>>>>> ad5fa1d83a80ac913fdd0606afc89a3de855cc10

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public cuisines: string[];

  locationFromNavigator: { lat: number; lng: number };

<<<<<<< HEAD
  constructor(private db: DbService, private router: Router ) {
    this.cuisines = [];
=======
  constructor(
    private db: DbService,
    private router: Router) {
    this.cuisines = ['All Cuisines'];
>>>>>>> ad5fa1d83a80ac913fdd0606afc89a3de855cc10
    // Setting up default location
    this.locationFromNavigator = { lat: 1.3522174, lng: 103.87970299999999 };
  }

  ngOnInit() {
    // Get distinct cuisines
<<<<<<< HEAD
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
=======
    this.db.getProductList().pipe(
      flatMap((fooditems: Fooditem[]) => fooditems),
      map( (fooditem: Fooditem) => fooditem.cuisine),
      distinct(),
      tap( fi => console.log(fi))
    ).subscribe(fi => {
      this.cuisines.push(fi);
    });
    
    // this.geoLocations$ = this.firestore.getProducts$(2);
  }

  applyFilter() {
    this.db.isNonVegFilter$.next(true);
    this.router.navigateByUrl('/');
  }

>>>>>>> ad5fa1d83a80ac913fdd0606afc89a3de855cc10
}
