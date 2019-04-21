import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LocationService } from '../../../core/location.service';
import { IGeoInfo } from '../../../core/models';

@Component({
  selector: 'app-auto-address',
  templateUrl: './auto-address.component.html',
  styleUrls: ['./auto-address.component.scss']
})
export class AutoAddressComponent implements OnInit, OnChanges {

  subscription: Subscription;

  // @ViewChild('addessSearch') searchElm: ElementRef;
  @ViewChild('gmap') mapElm: ElementRef;
  @Input() productForm: FormGroup;
  @Input() userGeoInfo: IGeoInfo;

  constructor(private locationService: LocationService) {}

  ngOnChanges() {
    console.log('#### from ngOnChanges() ####');
    if (this.userGeoInfo) {
      this.patchUserAddress(this.userGeoInfo);
    }
  }

  ngOnInit() {}

  patchUserAddress(geoInfo: IGeoInfo) {
    this.productForm.get('addressForm').patchValue(
      {
        autoAddressFromMap: geoInfo.autoAddressFromMap,
        addressFromUser: geoInfo.addressFromUser,
        coordinates: geoInfo.coordinates
      });
    this.productForm.get('addressForm').disable();
  }

  getAddressFromMap(geo: IGeoInfo) {
    console.log('Address from placeAutoComplete: ', geo);
    this.productForm.get('addressForm.coordinates').patchValue(geo);
    this.productForm.get('addressForm.autoAddressFromMap').patchValue(geo.autoAddressFromMap);
    this.locationService.createMap(this.mapElm, geo.coordinates.latitude, geo.coordinates.longitude);
  }

}
