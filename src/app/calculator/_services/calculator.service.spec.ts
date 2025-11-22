import { CalculatorService } from './calculator.service';

describe('Calculator Service', () => {
  let service: CalculatorService;

  beforeEach(() => {
    service = new CalculatorService();
  });

  describe('roundUpTo10', () => {
    test.each([
      [91, 100],
      [89, 90],
      [100, 100],
      [0, 0],
    ])('%i rounds up to the nearest 10 -> %i', (x, expected) => {
      expect(service['roundUpTo10'](x)).toBe(expected);
    });
  });

  describe('parentContribution', () => {
    test('calculates parent contribution at 80% of amount', () => {
      const r = service['parentContribution'](100);
      expect(r).toBe(80);
    });

    test('works for zero', () => {
      const r = service['parentContribution'](0);
      expect(r).toBe(0);
    });

    test('throws for negative values', () => {
      expect(() => service['parentContribution'](-1)).toThrow();
    });

    test('rounds to two decimal places', () => {
      const r = service['parentContribution'](10.3333);
      expect(r).toBeCloseTo(8.27, 2);
    });
  });

  describe('governmentContribution', () => {
    test('calculates government contribution at 20% of amount', () => {
      const r = service['governmentContribution'](100);
      expect(r).toBe(20);
    });

    test('works for zero', () => {
      const r = service['governmentContribution'](0);
      expect(r).toBe(0);
    });

    test('throws for negative values', () => {
      expect(() => service['governmentContribution'](-1)).toThrow();
    });

    test('rounds to two decimal places', () => {
      const r = service['governmentContribution'](10.3333);
      expect(r).toBeCloseTo(2.07, 2);
    });
  });

  describe('calculateEntry', () => {
    test.each([
      [100, 80, 20, 100, 80, 20],
      [101, 80.8, 20.2, 110, 88, 22],
    ])(
      'calculates all contributions correctly for amount %i',
      (
        amount,
        parentContribution,
        governmentContribution,
        rounded,
        roundedParent,
        roundedGovernment,
      ) => {
        const result = service.calculateEntry(amount);
        expect(result.amount).toBe(amount);
        expect(result.parentContribution).toBe(parentContribution);
        expect(result.governmentContribution).toBe(governmentContribution);
        expect(result.rounded).toBe(rounded);
        expect(result.roundedParent).toBe(roundedParent);
        expect(result.roundedGovernment).toBe(roundedGovernment);
      },
    );
  });
});
