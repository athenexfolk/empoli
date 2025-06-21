import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypeManager } from './leave-type-manager';

describe('LeaveTypeManager', () => {
  let component: LeaveTypeManager;
  let fixture: ComponentFixture<LeaveTypeManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveTypeManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveTypeManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
