import { describe, expect, it } from 'vitest';
import { calculateShare } from './calc';

describe('calculateShare', () => {
  it('calculates 80/20 split for a normal amount', () => {
    const r = calculateShare(100);
    expect(r.user).toBe(80);
    expect(r.government).toBe(20);
  });

  it('works for zero', () => {
    const r = calculateShare(0);
    expect(r.user).toBe(0);
    expect(r.government).toBe(0);
  });

  it('throws for negative values', () => {
    expect(() => calculateShare(-1)).toThrow();
  });

  it('rounds to two decimal places', () => {
    const r = calculateShare(10.3333);
    // user = 10.3333 * 0.8 = 8.26664 -> 8.27
    // government = 2.06666 -> 2.07
    expect(r.user).toBeCloseTo(8.27, 2);
    expect(r.government).toBeCloseTo(2.07, 2);
  });
});
