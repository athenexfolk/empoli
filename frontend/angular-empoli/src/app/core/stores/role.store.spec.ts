import { TestBed } from '@angular/core/testing';

import { RoleStore } from './role.store';

describe('RoleStore', () => {
    let service: RoleStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RoleStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
