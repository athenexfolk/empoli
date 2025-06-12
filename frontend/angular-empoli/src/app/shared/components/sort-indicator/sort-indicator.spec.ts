import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortIndicator } from './sort-indicator';

describe('SortIndicator', () => {
  let component: SortIndicator;
  let fixture: ComponentFixture<SortIndicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortIndicator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortIndicator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
