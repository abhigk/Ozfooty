import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsHealinesComponent } from './news-healines.component';

describe('NewsHealinesComponent', () => {
  let component: NewsHealinesComponent;
  let fixture: ComponentFixture<NewsHealinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsHealinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsHealinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
