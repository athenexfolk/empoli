import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayCard } from './overlay-card';

describe('OverlayCard', () => {
  let component: OverlayCard;
  let fixture: ComponentFixture<OverlayCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
