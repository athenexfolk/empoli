import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypeList } from './leave-type-list';

describe('LeaveTypeList', () => {
  let component: LeaveTypeList;
  let fixture: ComponentFixture<LeaveTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveTypeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveTypeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
