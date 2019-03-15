import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


import { Fooditem } from "src/app/core/model";
import { Observable } from "rxjs";


const APP_ROOT_COLLECTIONS = {
  'PRODUCTS': 'products'
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productlistPath: string;
  private productlistRef: AngularFirestoreCollection<Fooditem>;


  constructor(private afs: AngularFirestore) {
    this.productlistPath = APP_ROOT_COLLECTIONS['PRODUCTS'];
    this.productlistRef = afs.collection(APP_ROOT_COLLECTIONS['PRODUCTS']);

   }

  getProductList(): Observable<Fooditem[]> {
    this.productlistRef.ref.orderBy('createdAt', 'desc');
    return this.afs.collection<Fooditem>
      (APP_ROOT_COLLECTIONS['PRODUCTS'], ref => ref.orderBy('createdAt', 'desc')).valueChanges();
  }
}
