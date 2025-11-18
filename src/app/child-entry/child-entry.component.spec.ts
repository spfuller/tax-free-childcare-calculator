import { inputBinding, outputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildEntryComponent } from './child-entry.component';

describe('ChildEntryComponent', () => {
  let component: ChildEntryComponent;
  let fixture: ComponentFixture<ChildEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildEntryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildEntryComponent, {
      bindings: [
        inputBinding('child', () => ({})),
        inputBinding('index', () => 0),
        inputBinding('showDelete', () => true),

        outputBinding('removeChild', () => {}),
        outputBinding('updateAmount', () => {}),
      ],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
