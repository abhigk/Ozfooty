import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCmpComponent } from './sidebar-cmp.component';

describe('SidebarCmpComponent', () => {
  let component: SidebarCmpComponent;
  let fixture: ComponentFixture<SidebarCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
