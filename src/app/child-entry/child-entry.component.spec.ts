import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildEntryComponent } from './child-entry.component';

describe('ChildEntryComponent', () => {
  let component: ChildEntryComponent;
  let fixture: ComponentFixture<ChildEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
