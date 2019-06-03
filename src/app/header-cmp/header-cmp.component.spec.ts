import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCmpComponent } from './header-cmp.component';

describe('HeaderCmpComponent', () => {
  let component: HeaderCmpComponent;
  let fixture: ComponentFixture<HeaderCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
