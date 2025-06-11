import { TestBed } from '@angular/core/testing';

import { EmployeeStore } from './employee.store';

describe('EmployeeStore', () => {
  let service: EmployeeStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
