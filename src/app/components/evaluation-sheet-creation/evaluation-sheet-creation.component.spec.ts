import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationSheetCreationComponent } from './evaluation-sheet-creation.component';

describe('EvaluationSheetCreationComponent', () => {
    let component: EvaluationSheetCreationComponent;
    let fixture: ComponentFixture<EvaluationSheetCreationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EvaluationSheetCreationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EvaluationSheetCreationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
