import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOfferDialogComponent } from './pick-offer-dialog.component';

describe('PickOfferDialogComponent', () => {
  let component: PickOfferDialogComponent;
  let fixture: ComponentFixture<PickOfferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickOfferDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
