import { TestBed } from '@angular/core/testing';

import { StudiengangService } from './studiengang.service';

describe('StudiengangService', () => {
    let service: StudiengangService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StudiengangService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
