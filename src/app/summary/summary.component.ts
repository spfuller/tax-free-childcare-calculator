import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { UUIDTypes } from 'uuid';

import { ChildCardComponent } from '../child-card';

@Component({
  selector: 'app-summary',
  imports: [CurrencyPipe, ChildCardComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  children = input.required<
    {
      amount: number;
      parentContribution: number;
      governmentContribution: number;
      rounded: number;
      roundedParent: number;
      roundedGovernment: number;
      id: UUIDTypes;
    }[]
  >();

  totals = computed(() => {
    const entries = this.children();
    const parent = entries.reduce((sum, c) => sum + c.parentContribution, 0);
    const government = entries.reduce((sum, c) => sum + c.governmentContribution, 0);
    const roundedParent = entries.reduce((sum, c) => sum + c.roundedParent, 0);
    const roundedGovernment = entries.reduce((sum, c) => sum + c.roundedGovernment, 0);

    return {
      parent,
      government,
      total: parent + government,
      roundedParent,
      roundedGovernment,
      roundedTotal: roundedParent + roundedGovernment,
    };
  });
}
