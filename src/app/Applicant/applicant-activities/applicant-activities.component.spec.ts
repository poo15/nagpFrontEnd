import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantActivitiesComponent } from './applicant-activities.component';

describe('ApplicantActivitiesComponent', () => {
  let component: ApplicantActivitiesComponent;
  let fixture: ComponentFixture<ApplicantActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
