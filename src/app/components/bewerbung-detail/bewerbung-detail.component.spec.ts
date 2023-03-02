import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewerbungDetailComponent } from './bewerbung-detail.component';

describe('BewerbungDetailComponent', () => {
  let component: BewerbungDetailComponent;
  let fixture: ComponentFixture<BewerbungDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BewerbungDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BewerbungDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
