import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiengangDetailComponent } from './studiengang-detail.component';

describe('StudiengangDetailComponent', () => {
    let component: StudiengangDetailComponent;
    let fixture: ComponentFixture<StudiengangDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StudiengangDetailComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(StudiengangDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
