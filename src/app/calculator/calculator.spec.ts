import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { CalculatorComponent } from './calculator';

describe('CalculatorComponent (DOM)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
    }).compileComponents();
  });

  it('adds and removes child rows', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // initially one input
    let inputs = compiled.querySelectorAll('input[type="number"]');
    expect(inputs.length).toBe(1);

    // click Add child
    const addBtn = compiled.querySelector('button.btn-primary') as HTMLButtonElement;
    expect(addBtn).toBeTruthy();
    addBtn.click();
    fixture.detectChanges();

    inputs = compiled.querySelectorAll('input[type="number"]');
    expect(inputs.length).toBe(2);

    // remove second child
    const removeBtns = compiled.querySelectorAll('button.btn-danger');
    // second remove button should exist
    expect(removeBtns.length).toBeGreaterThanOrEqual(1);
    (removeBtns[removeBtns.length - 1] as HTMLButtonElement).click();
    fixture.detectChanges();

    inputs = compiled.querySelectorAll('input[type="number"]');
    expect(inputs.length).toBe(1);
  });

  it('updates share and totals when amount changed', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[type="number"]') as HTMLInputElement;
    expect(input).toBeTruthy();

    // set amount to 100
    input.value = '100';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Check exact amount values
    const exactAmountText = compiled.querySelector('.text-muted')?.textContent || '';
    expect(exactAmountText).toContain('Based on exact amount:');

    const exactAmounts = compiled.querySelectorAll('.mb-1 strong');
    expect(exactAmounts.length).toBeGreaterThanOrEqual(2);
    expect(exactAmounts[0].textContent).toContain('£80.00');
    expect(exactAmounts[1].textContent).toContain('£20.00');

    // Check total exact amounts
    const exactTotals =
      compiled
        .querySelector('.card.bg-light')
        ?.querySelectorAll('.d-flex.justify-content-between strong') || [];
    expect(exactTotals.length).toBeGreaterThanOrEqual(2);
    expect(exactTotals[0].textContent).toContain('£80.00');
    expect(exactTotals[1].textContent).toContain('£20.00');
  });

  it('prevents negative values by resetting to zero', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[type="number"]') as HTMLInputElement;
    input.value = '-5';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const exactAmounts = compiled.querySelectorAll('.mb-1 strong');
    expect(exactAmounts[0].textContent).toContain('£0.00');
  });
});
