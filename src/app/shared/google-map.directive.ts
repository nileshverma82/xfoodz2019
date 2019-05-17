import { Directive, Input, ElementRef, OnInit } from '@angular/core';


@Directive({
  selector: '[appGoogleMap]'
})
export class GoogleMapDirective implements OnInit {
  @Input() latLng: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.createMap(this.latLng);
  }

  createMap(coords: firebase.firestore.GeoPoint) {

    const myLatLng = { lat: coords.latitude, lng: coords.longitude };
    const gmap = new google.maps.Map(this.elementRef.nativeElement, {
      zoom: 16,
      center: myLatLng,
      disableDefaultUI: true,
      scrollwheel: false,
    });

    const marker = new google.maps.Marker({
      position: myLatLng,
      map: gmap,
    });
  }

}
