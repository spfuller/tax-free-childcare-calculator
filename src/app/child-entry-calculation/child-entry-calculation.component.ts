import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-child-entry-calculation',
  imports: [CurrencyPipe],
  templateUrl: './child-entry-calculation.component.html',
  styleUrl: './child-entry-calculation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class ChildEntryCalculationComponent {
  label = input.required<string>();
  value = input.required<number>();
}
