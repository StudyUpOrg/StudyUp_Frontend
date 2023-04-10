import { TestBed } from '@angular/core/testing';

import { BewerbungService } from './bewerbung.service';

describe('BewerbungService', () => {
    let service: BewerbungService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BewerbungService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
