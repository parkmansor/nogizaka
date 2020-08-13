import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NogiHistComponent } from './nogi-hist.component';

describe('NogiHistComponent', () => {
  let component: NogiHistComponent;
  let fixture: ComponentFixture<NogiHistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NogiHistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NogiHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
