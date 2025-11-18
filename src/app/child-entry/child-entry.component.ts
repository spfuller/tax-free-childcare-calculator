import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UUIDTypes } from 'uuid';

import { ChildCardComponent } from '../child-card';
import { ChildEntryCalculationComponent } from '../child-entry-calculation';

@Component({
  selector: 'app-child-entry',
  imports: [FormsModule, ChildCardComponent, ChildEntryCalculationComponent],
  templateUrl: './child-entry.component.html',
  styleUrl: './child-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildEntryComponent {
  child = input.required<any>();
  index = input.required<number>();
  showDelete = input.required<boolean>();

  removeChild = output<UUIDTypes>();
  updateAmount = output<{ id: UUIDTypes; value: string }>();

  childIndex = computed(() => this.index() + 1);
}
