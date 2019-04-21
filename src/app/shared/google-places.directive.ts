/// <reference types="@types/googlemaps" />
import { Directive, ElementRef, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { IGeoInfo } from '../core/models';
import { ScriptLoadService } from '../core/script-load.service';


@Directive({
  selector: '[appPlaceAutoComplete]'
})
export class GooglePlacesDirective implements OnInit {
  @Output() addressFromMap: EventEmitter<IGeoInfo> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private mapScript: ScriptLoadService,
    private ngZone: NgZone) {
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.mapScript.loadScript({ name: 'googleMaps', url: environment.googleMapURL, id: 'google-map' })
      .then(resp => {
        console.log('Resp from LoadScript: ', resp);
        this.placeAutoComplete(this.element);
      });
  }

  placeAutoComplete(searchElement) {
    const autoComplete = new google.maps.places.Autocomplete(searchElement /*, {types: ['geocode']}*/);
    autoComplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autoComplete.getPlace();
        // console.log('place ####: ', place);

        if (place.geometry) {
          const geoPoint = new firebase.firestore.GeoPoint(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );

          const geo: IGeoInfo = {
            coordinates: geoPoint,
            autoAddressFromMap: place.formatted_address,
            addressFromUser: null
          };
          this.addressFromMap.emit(geo);

        }
      });

    });
  }

}
