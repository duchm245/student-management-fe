import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClazzDialogComponent } from './add-clazz-dialog.component';

describe('AddClazzDialogComponent', () => {
  let component: AddClazzDialogComponent;
  let fixture: ComponentFixture<AddClazzDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClazzDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClazzDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
