import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewerbungStatusComponent } from './bewerbung-status.component';

describe('BewerbungStatusComponent', () => {
    let component: BewerbungStatusComponent;
    let fixture: ComponentFixture<BewerbungStatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BewerbungStatusComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BewerbungStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
