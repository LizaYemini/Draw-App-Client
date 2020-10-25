import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveWatchersComponent } from './live-watchers.component';

describe('LiveWatchersComponent', () => {
  let component: LiveWatchersComponent;
  let fixture: ComponentFixture<LiveWatchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveWatchersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveWatchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
