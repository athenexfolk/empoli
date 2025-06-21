import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveType } from './add-leave-type';

describe('AddLeaveType', () => {
  let component: AddLeaveType;
  let fixture: ComponentFixture<AddLeaveType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLeaveType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeaveType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
