import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedpwdComponent } from './sharedpwd.component';

describe('SharedpwdComponent', () => {
  let component: SharedpwdComponent;
  let fixture: ComponentFixture<SharedpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
