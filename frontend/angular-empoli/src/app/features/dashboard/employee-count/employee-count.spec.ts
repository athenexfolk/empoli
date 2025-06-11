import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCount } from './employee-count';

describe('EmployeeCount', () => {
  let component: EmployeeCount;
  let fixture: ComponentFixture<EmployeeCount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
