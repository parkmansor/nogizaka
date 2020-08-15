import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NogiUranaiComponent } from './nogi-uranai.component';

describe('NogiUranaiComponent', () => {
  let component: NogiUranaiComponent;
  let fixture: ComponentFixture<NogiUranaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NogiUranaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NogiUranaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
