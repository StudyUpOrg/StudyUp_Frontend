import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiengangOverviewComponent } from './studiengang-overview.component';

describe('StudiengangOverviewComponent', () => {
    let component: StudiengangOverviewComponent;
    let fixture: ComponentFixture<StudiengangOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StudiengangOverviewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(StudiengangOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
