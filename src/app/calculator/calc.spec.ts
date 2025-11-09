import { describe, expect, it } from 'vitest';
import { calculateOptimalShare, calculateShare, roundUpToNearest10 } from './calc';

describe('roundUpToNearest10', () => {
  it('rounds up to the nearest 10', () => {
    expect(roundUpToNearest10(91)).toBe(100);
    expect(roundUpToNearest10(89)).toBe(90);
    expect(roundUpToNearest10(100)).toBe(100);
    expect(roundUpToNearest10(0)).toBe(0);
  });
});

describe('calculateOptimalShare', () => {
  it('calculates optimal share with rounding', () => {
    const result = calculateOptimalShare(91);
    expect(result.originalTotal).toBe(91);
    expect(result.roundedTotal).toBe(100);
    expect(result.difference).toBe(9);
    expect(result.user).toBe(80);
    expect(result.government).toBe(20);
  });

  it('returns same values when already at optimal amount', () => {
    const result = calculateOptimalShare(100);
    expect(result.originalTotal).toBe(100);
    expect(result.roundedTotal).toBe(100);
    expect(result.difference).toBe(0);
    expect(result.user).toBe(80);
    expect(result.government).toBe(20);
  });
});

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
