import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeaveType } from './update-leave-type';

describe('UpdateLeaveType', () => {
    let component: UpdateLeaveType;
    let fixture: ComponentFixture<UpdateLeaveType>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UpdateLeaveType],
        }).compileComponents();

        fixture = TestBed.createComponent(UpdateLeaveType);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
