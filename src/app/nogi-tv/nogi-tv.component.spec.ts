import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NogiTvComponent } from './nogi-tv.component';

describe('NogiTvComponent', () => {
  let component: NogiTvComponent;
  let fixture: ComponentFixture<NogiTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NogiTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NogiTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
