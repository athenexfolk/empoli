import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleManager } from './role-manager';

describe('RoleManager', () => {
    let component: RoleManager;
    let fixture: ComponentFixture<RoleManager>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RoleManager],
        }).compileComponents();

        fixture = TestBed.createComponent(RoleManager);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
