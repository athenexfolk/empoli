import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManagerPage } from './employee-manager.page';

describe('EmployeeManagerPage', () => {
    let component: EmployeeManagerPage;
    let fixture: ComponentFixture<EmployeeManagerPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EmployeeManagerPage],
        }).compileComponents();

        fixture = TestBed.createComponent(EmployeeManagerPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
