import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewerbungEvaluationComponent } from './bewerbung-evaluation.component';

describe('BewerbungEvaluationComponent', () => {
    let component: BewerbungEvaluationComponent;
    let fixture: ComponentFixture<BewerbungEvaluationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BewerbungEvaluationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BewerbungEvaluationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
