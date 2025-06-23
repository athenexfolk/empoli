import { TestBed } from '@angular/core/testing';
import { LeaveTypeStore } from './leave-type.store';

describe('LeaveTypeStore', () => {
    let service: LeaveTypeStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LeaveTypeStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
