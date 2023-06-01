import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzPageComponent } from './clazz-page.component';

describe('ClazzPageComponent', () => {
  let component: ClazzPageComponent;
  let fixture: ComponentFixture<ClazzPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClazzPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClazzPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
