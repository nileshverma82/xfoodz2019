import { Component, EventEmitter, OnInit, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { IGeoInfo } from 'src/app/core/models';
import * as firebase from 'firebase';

@Component({
  selector: 'app-address-with-map',
  templateUrl: './address-with-map.component.html',
  styleUrls: ['./address-with-map.component.scss']
})
export class AddressWithMapComponent implements OnInit {
  @Input() includeMap: boolean;
  @Input() additionalAddress: boolean;
  @Input() geoInfo: IGeoInfo;
  @Output() selectedAddress: EventEmitter<IGeoInfo> = new EventEmitter();
  @ViewChild('gmap') mapElm: ElementRef;


  constructor() {
    if (!this.geoInfo) {
      this.geoInfo = {};
      }
   }

  ngOnInit() {
  }

  getAddressFromMap(address: IGeoInfo) {
    this.geoInfo = address;
    this.selectedAddress.emit(this.geoInfo);
  }

  // Create a map with the marker.
  createMap(mapElement: ElementRef, coords: firebase.firestore.GeoPoint): google.maps.Map {
    const myLatLng = { lat: coords.latitude, lng: coords.longitude };
    const gmap = new google.maps.Map(mapElement.nativeElement, {
      zoom: 16,
      center: myLatLng,
      disableDefaultUI: true,
      scrollwheel: false,
    });

    const marker = new google.maps.Marker({
      position: myLatLng,
      map: gmap,
    });

    return gmap;
  }

  onSubmit() {
    console.log('Form submitted...', this.geoInfo);
  }



}
