import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesNearbyComponent } from './games-nearby.component';

describe('GamesNearbyComponent', () => {
  let component: GamesNearbyComponent;
  let fixture: ComponentFixture<GamesNearbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesNearbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesNearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
