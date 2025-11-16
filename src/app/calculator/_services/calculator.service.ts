import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private readonly parentRatio = 0.8;
  private readonly governmentRatio = 0.2;

  private parentContribution(amount: number): number {
    return this.calculateContribution(amount, this.parentRatio);
  }

  private governmentContribution(amount: number): number {
    return this.calculateContribution(amount, this.governmentRatio);
  }

  private calculateContribution(amount: number, ratio: number): number {
    const t = Number(amount ?? 0);
    if (!Number.isFinite(t) || t < 0) {
      throw new Error('total must be a non-negative number');
    }

    // Round to 2 decimals
    return Math.round((amount * ratio + Number.EPSILON) * 100) / 100;
  }

  private roundUpTo10(amount: number): number {
    return Math.ceil(amount / 10) * 10;
  }

  calculateEntry(amount: number) {
    const rounded = this.roundUpTo10(amount);

    return {
      amount,
      parentContribution: this.parentContribution(amount),
      governmentContribution: this.governmentContribution(amount),
      rounded,
      roundedParent: this.parentContribution(rounded),
      roundedGovernment: this.governmentContribution(rounded),
    };
  }
}
