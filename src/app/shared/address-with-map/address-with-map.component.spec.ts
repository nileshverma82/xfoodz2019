import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressWithMapComponent } from './address-with-map.component';

describe('AddressWithMapComponent', () => {
  let component: AddressWithMapComponent;
  let fixture: ComponentFixture<AddressWithMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressWithMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressWithMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
