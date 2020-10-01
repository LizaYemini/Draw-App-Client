import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDocsComponent } from './share-docs.component';

describe('ShareDocsComponent', () => {
  let component: ShareDocsComponent;
  let fixture: ComponentFixture<ShareDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
