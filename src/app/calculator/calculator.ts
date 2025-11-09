import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { calculateShare, formatCurrency } from './calc';

@Component({
  selector: 'app-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
  // signal holding array of invoice totals per child
  protected totals = signal<number[]>([0]);

  // derived totals using computed()
  protected totalUser = computed(() =>
    this.totals().reduce((s: number, t: number) => s + calculateShare(t).user, 0)
  );

  protected totalGovernment = computed(() =>
    this.totals().reduce((s: number, t: number) => s + calculateShare(t).government, 0)
  );

  addChild() {
    this.totals.update((arr: number[]) => [...arr, 0]);
  }

  removeChild(index: number) {
    this.totals.update((arr: number[]) => arr.filter((_, i) => i !== index));
  }

  updateAmount(index: number, value: string) {
    const n = Number(value);
    this.totals.update((arr: number[]) =>
      arr.map((v, i) => (i === index ? (Number.isFinite(n) && n >= 0 ? n : 0) : v))
    );
  }

  shareFor(index: number) {
    const t = this.totals()[index] ?? 0;
    return calculateShare(t);
  }

  fmt(n: number) {
    return formatCurrency(n);
  }
}
