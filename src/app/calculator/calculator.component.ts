import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { UUIDTypes, v4 } from 'uuid';

import { ChildEntryComponent } from '../child-entry';
import { SummaryComponent } from '../summary';
import { CalculatorService } from './_services';

@Component({
  selector: 'app-calculator',
  imports: [ChildEntryComponent, SummaryComponent],
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
}
