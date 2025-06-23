import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryLayout } from './primary-layout';

describe('PrimaryLayout', () => {
    let component: PrimaryLayout;
    let fixture: ComponentFixture<PrimaryLayout>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PrimaryLayout],
        }).compileComponents();

        fixture = TestBed.createComponent(PrimaryLayout);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
