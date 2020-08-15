import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleValuationDetailsComponent } from './vehicle-valuation-details.component';

describe('VehicleValuationDetailsComponent', () => {
  let component: VehicleValuationDetailsComponent;
  let fixture: ComponentFixture<VehicleValuationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleValuationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleValuationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
