import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { calculateOptimalShare, calculateShare, formatCurrency } from './calc';

@Component({
  selector: 'app-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
  // signal holding array of invoice totals per child
  protected values = signal<number[]>([0]);

  // derived totals using computed()
  protected total = computed(() => this.values().reduce((s: number, t: number) => s + t, 0));

  protected totalUser = computed(() =>
    this.values().reduce((s: number, t: number) => s + calculateShare(t).user, 0),
  );

  protected totalGovernment = computed(() =>
    this.values().reduce((s: number, t: number) => s + calculateShare(t).government, 0),
  );

  // optimal rounded totals
  protected totalOptimalUser = computed(() =>
    this.values().reduce((s: number, t: number) => s + calculateOptimalShare(t).user, 0),
  );

  protected totalOptimalGovernment = computed(() =>
    this.values().reduce((s: number, t: number) => s + calculateOptimalShare(t).government, 0),
  );

  protected totalOptimalDifference = computed(() =>
    this.values().reduce((s: number, t: number) => s + calculateOptimalShare(t).difference, 0),
  );

  addChild() {
    this.values.update((arr: number[]) => [...arr, 0]);
  }

  removeChild(index: number) {
    this.values.update((arr: number[]) => arr.filter((_, i) => i !== index));
  }

  updateAmount(index: number, value: string) {
    const n = Number(value);
    this.values.update((arr: number[]) =>
      arr.map((v, i) => (i === index ? (Number.isFinite(n) && n >= 0 ? n : 0) : v)),
    );
  }

  shareFor(index: number) {
    const t = this.values()[index] ?? 0;
    return calculateShare(t);
  }

  optimalShareFor(index: number) {
    const t = this.values()[index] ?? 0;
    return calculateOptimalShare(t);
  }

  fmt(n: number) {
    return formatCurrency(n);
  }
}
