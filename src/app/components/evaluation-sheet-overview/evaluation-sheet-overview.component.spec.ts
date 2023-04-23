import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationSheetOverviewComponent } from './evaluation-sheet-overview.component';

describe('EvaluationSheetOverviewComponent', () => {
    let component: EvaluationSheetOverviewComponent;
    let fixture: ComponentFixture<EvaluationSheetOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EvaluationSheetOverviewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EvaluationSheetOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
