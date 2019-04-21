// Typescript tripple-slash directive to resolve googlemaps error
/// <reference types="@types/googlemaps" />

import { ElementRef, Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

const GEOLOCATION_ERRORS = {
  'errors.location.unsupportedBrowser': 'Browser does not support location services',
  'errors.location.permissionDenied': 'You have rejected access to your location',
  'errors.location.positionUnavailable': 'Unable to determine your location',
  'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  myCurrentPosition: Observable<Position>;

  constructor() {
    this.myCurrentPosition = this.getCurrentPosition();
  }

  // retruns user position detected by browser navigator
  private getCurrentPosition(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
      // Invokes getCurrentPosition method of Geolocation API.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: Position) => {
            observer.next(position);
            observer.complete();
          },
          (error: PositionError) => {
            switch (error.code) {
              case 1:
                observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                break;
              case 2:
                observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                break;
              case 3:
                observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                break;
            }
          },
          { enableHighAccuracy: true, maximumAge: 600000, timeout: 500000 }
        );
      } else {
        observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
      }
    });
  }

  // Create a map with the marker.
  createMap(mapElement: ElementRef, myLat: any, myLng: any): google.maps.Map {

    const myLatLng = { lat: myLat, lng: myLng };
    const map = new google.maps.Map(mapElement.nativeElement, {
      zoom: 16,
      center: myLatLng,
      disableDefaultUI: true,
      scrollwheel: false,
    });

    // const marker = new google.maps.Marker({
    //   position: myLatLng,
    //   map: map,
    // });

    return map;
  }

}
