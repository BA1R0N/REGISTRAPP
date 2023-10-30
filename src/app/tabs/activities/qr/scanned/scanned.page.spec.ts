import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScannedPage } from './scanned.page';

describe('ScannedPage', () => {
  let component: ScannedPage;
  let fixture: ComponentFixture<ScannedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScannedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
