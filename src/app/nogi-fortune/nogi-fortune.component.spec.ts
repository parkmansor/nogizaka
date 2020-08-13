import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NogiFortuneComponent } from './nogi-fortune.component';

describe('NogiFortuneComponent', () => {
  let component: NogiFortuneComponent;
  let fixture: ComponentFixture<NogiFortuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NogiFortuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NogiFortuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
