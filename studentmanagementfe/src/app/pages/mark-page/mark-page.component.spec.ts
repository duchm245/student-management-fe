import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkPageComponent } from './mark-page.component';

describe('MarkPageComponent', () => {
  let component: MarkPageComponent;
  let fixture: ComponentFixture<MarkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
