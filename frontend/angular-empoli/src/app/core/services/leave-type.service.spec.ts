import { TestBed } from '@angular/core/testing';

import { LeaveTypeService } from './leave-type.service';

describe('LeaveTypeService', () => {
  let service: LeaveTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
