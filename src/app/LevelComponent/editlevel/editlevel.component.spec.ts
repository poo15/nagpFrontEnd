import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlevelComponent } from './editlevel.component';

describe('EditlevelComponent', () => {
  let component: EditlevelComponent;
  let fixture: ComponentFixture<EditlevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
