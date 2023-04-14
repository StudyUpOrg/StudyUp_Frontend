import { TestBed } from '@angular/core/testing';

import { EvaluationSheetService } from './evaluation-sheet.service';

describe('EvaluationSheetService', () => {
    let service: EvaluationSheetService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EvaluationSheetService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
