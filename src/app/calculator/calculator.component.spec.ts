import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent (DOM)', () => {
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    fixture.detectChanges();
  });

  test('creates the component', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test('adds and removes child rows', () => {
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
    const removeBtns = compiled.querySelectorAll('button.btn-outline-danger');
    // second remove button should exist
    expect(removeBtns.length).toBe(2);
    (removeBtns[removeBtns.length - 1] as HTMLButtonElement).click();
    fixture.detectChanges();

    inputs = compiled.querySelectorAll('input[type="number"]');
    expect(inputs.length).toBe(1);
  });

  test('updates share and totals when amount changed', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[type="number"]') as HTMLInputElement;
    expect(input).toBeTruthy();

    // set amount to 100
    input.value = '101';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Check calculated amounts
    const calculatedAmounts = compiled.querySelectorAll('.amount-value');
    expect(calculatedAmounts.length).toBe(4);
    // Actual
    expect(calculatedAmounts[0].textContent).toContain('£80.80');
    expect(calculatedAmounts[1].textContent).toContain('£20.20');
    // Rounded
    expect(calculatedAmounts[2].textContent).toContain('£88.00');
    expect(calculatedAmounts[3].textContent).toContain('£22.00');

    const actualTotalsRow = compiled.querySelector('tr.actual-totals');
    expect(actualTotalsRow).toBeTruthy();
    const actualTotalsCells = actualTotalsRow?.querySelectorAll('td');
    expect(actualTotalsCells?.length).toBe(3);
    expect(actualTotalsCells?.[0].textContent).toContain('£80.80');
    expect(actualTotalsCells?.[1].textContent).toContain('£20.20');
    expect(actualTotalsCells?.[2].textContent).toContain('£101.00');

    const roundedTotalsRow = compiled.querySelector('tr.rounded-totals');
    expect(roundedTotalsRow).toBeTruthy();
    const roundedTotalsCells = roundedTotalsRow?.querySelectorAll('td');
    expect(roundedTotalsCells?.length).toBe(3);
    expect(roundedTotalsCells?.[0].textContent).toContain('£88.00');
    expect(roundedTotalsCells?.[1].textContent).toContain('£22.00');
    expect(roundedTotalsCells?.[2].textContent).toContain('£110.00');
  });

  test('prevents negative values by resetting to zero', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[type="number"]') as HTMLInputElement;
    input.value = '-5';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const exactAmounts = compiled.querySelectorAll('.amount-value');
    expect(exactAmounts[0].textContent).toContain('£0.00');
  });

  test('updates calculations when multiple children amounts changed', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // click Add child
    const addBtn = compiled.querySelector<HTMLButtonElement>('button.btn-primary');
    expect(addBtn).toBeTruthy();
    addBtn!.click();
    fixture.detectChanges();

    const inputs = compiled.querySelectorAll<HTMLInputElement>('input[type="number"]');
    expect(inputs.length).toBe(2);

    // set first amount to 100
    inputs[0].value = '100';
    inputs[0].dispatchEvent(new Event('input'));

    // set first amount to 101
    inputs[1].value = '101';
    inputs[1].dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const childCards = compiled.querySelectorAll('.children-list .child-card');
    expect(childCards.length).toBe(2);

    // Check first card calculated amounts
    let calculatedAmounts = childCards[0].querySelectorAll('.amount-value');
    expect(calculatedAmounts.length).toBe(4);
    // Actual
    expect(calculatedAmounts[0].textContent).toContain('£80');
    expect(calculatedAmounts[1].textContent).toContain('£20');
    // Rounded
    expect(calculatedAmounts[2].textContent).toContain('£80.00');
    expect(calculatedAmounts[3].textContent).toContain('£20.00');

    // Check second card calculated amounts
    calculatedAmounts = childCards[1].querySelectorAll('.amount-value');
    expect(calculatedAmounts.length).toBe(4);
    // Actual
    expect(calculatedAmounts[0].textContent).toContain('£80.80');
    expect(calculatedAmounts[1].textContent).toContain('£20.20');
    // Rounded
    expect(calculatedAmounts[2].textContent).toContain('£88.00');
    expect(calculatedAmounts[3].textContent).toContain('£22.00');

    const actualTotalsRow = compiled.querySelector('tr.actual-totals');
    expect(actualTotalsRow).toBeTruthy();
    const actualTotalsCells = actualTotalsRow?.querySelectorAll('td');
    expect(actualTotalsCells?.length).toBe(3);
    expect(actualTotalsCells?.[0].textContent).toContain('£160.80');
    expect(actualTotalsCells?.[1].textContent).toContain('£40.20');
    expect(actualTotalsCells?.[2].textContent).toContain('£201.00');

    const roundedTotalsRow = compiled.querySelector('tr.rounded-totals');
    expect(roundedTotalsRow).toBeTruthy();
    const roundedTotalsCells = roundedTotalsRow?.querySelectorAll('td');
    expect(roundedTotalsCells?.length).toBe(3);
    expect(roundedTotalsCells?.[0].textContent).toContain('£168.00');
    expect(roundedTotalsCells?.[1].textContent).toContain('£42.00');
    expect(roundedTotalsCells?.[2].textContent).toContain('£210.00');
  });
});
