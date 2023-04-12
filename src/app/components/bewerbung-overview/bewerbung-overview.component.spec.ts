import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewerbungOverviewComponent } from './bewerbung-overview.component';

describe('BewerbungOverviewComponent', () => {
    let component: BewerbungOverviewComponent;
    let fixture: ComponentFixture<BewerbungOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BewerbungOverviewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BewerbungOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
