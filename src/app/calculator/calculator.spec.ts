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

    // per-child YOU and GOVERNMENT values are shown in small tags within the row
    const smalls = compiled.querySelectorAll('.mb-3 small');
    // Expect at least two smalls: YOU and GOVERNMENT
    expect(smalls.length).toBeGreaterThanOrEqual(2);
    const youText = smalls[0].textContent || '';
    const govText = smalls[1].textContent || '';
    expect(youText).toContain('£80.00');
    expect(govText).toContain('£20.00');

    // Totals shown at bottom
    const totals = compiled.querySelectorAll('.d-flex.justify-content-between');
    expect(totals.length).toBeGreaterThanOrEqual(2);
    const totalYou = totals[0].querySelector('strong')?.textContent || '';
    const totalGov = totals[1].querySelector('strong')?.textContent || '';
    expect(totalYou).toContain('£80.00');
    expect(totalGov).toContain('£20.00');
  });

  it('prevents negative values by resetting to zero', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[type="number"]') as HTMLInputElement;
    input.value = '-5';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const smalls = compiled.querySelectorAll('.mb-3 small');
    const youText = smalls[0].textContent || '';
    expect(youText).toContain('£0.00');
  });
});
