import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { Fooditem } from '../core/models';
import { DbService } from '../core/db.service';


@Injectable()
export class ProductResolver implements Resolve<Fooditem> {

    constructor(
        private db: DbService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Fooditem> {
        const id = route.paramMap.get('id');
        return this.db.getProductByID(id).pipe(
            delay(2000), // added a delay to test loading spinner. To be removed later.
            take(1)
        );

           }
    }
