import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewerbungLinkComponent } from './bewerbung-link.component';

describe('BewerbungLinkComponent', () => {
  let component: BewerbungLinkComponent;
  let fixture: ComponentFixture<BewerbungLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BewerbungLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BewerbungLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
