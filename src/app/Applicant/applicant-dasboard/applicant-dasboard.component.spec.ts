import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantDasboardComponent } from './applicant-dasboard.component';

describe('ApplicantDasboardComponent', () => {
  let component: ApplicantDasboardComponent;
  let fixture: ComponentFixture<ApplicantDasboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantDasboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
