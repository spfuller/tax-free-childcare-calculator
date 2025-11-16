import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UUIDTypes, v4 } from 'uuid';

import { CalculatorService } from './_services/calculator.service';

@Component({
  selector: 'app-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
  private readonly calculatorService = inject(CalculatorService);

  private readonly children = signal<{ id: UUIDTypes; invoiceAmount: number | null }[]>([
    { id: v4(), invoiceAmount: null },
  ]);

  protected addChild = () => {
    this.children.update((children) => [...children, { id: v4(), invoiceAmount: null }]);
  };

  protected removeChild = (id: UUIDTypes) => {
    this.children.update((children) => children.filter((c) => c.id !== id));
  };

  protected updateAmount(id: UUIDTypes, value: string) {
    const amount = Number(value);
    this.children.update((children) =>
      children.map((c) =>
        c.id === id
          ? Number.isFinite(amount) && amount >= 0
            ? { ...c, invoiceAmount: amount }
            : { ...c, invoiceAmount: 0 }
          : c,
      ),
    );
  }

  protected readonly computedChildren = computed(() =>
    this.children().map((c) => ({
      id: c.id,
      ...this.calculatorService.calculateEntry(c.invoiceAmount ?? 0),
    })),
  );

  protected readonly totals = computed(() => {
    const entries = this.computedChildren();
    const actualParent = entries.reduce((sum, c) => sum + c.parentContribution, 0);
    const actualGovernment = entries.reduce((sum, c) => sum + c.governmentContribution, 0);
    const roundedParent = entries.reduce((sum, c) => sum + c.roundedParent, 0);
    const roundedGovernment = entries.reduce((sum, c) => sum + c.roundedGovernment, 0);

    return {
      parent: actualParent,
      government: actualGovernment,
      total: actualParent + actualGovernment,
      roundedParent: roundedParent,
      roundedGovernment: roundedGovernment,
      roundedTotal: roundedParent + roundedGovernment,
    };
  });
}
