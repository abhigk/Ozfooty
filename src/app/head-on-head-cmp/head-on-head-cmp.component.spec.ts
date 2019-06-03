import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadOnHeadCmpComponent } from './head-on-head-cmp.component';

describe('HeadOnHeadCmpComponent', () => {
  let component: HeadOnHeadCmpComponent;
  let fixture: ComponentFixture<HeadOnHeadCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadOnHeadCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadOnHeadCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
