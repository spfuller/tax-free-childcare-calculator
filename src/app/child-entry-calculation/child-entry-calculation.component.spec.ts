import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildEntryCalculationComponent } from './child-entry-calculation.component';

describe('ChildEntryCalculationComponent', () => {
  let component: ChildEntryCalculationComponent;
  let fixture: ComponentFixture<ChildEntryCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildEntryCalculationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildEntryCalculationComponent, {
      bindings: [inputBinding('label', () => 'Test Label'), inputBinding('value', () => 100)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
