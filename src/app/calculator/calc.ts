export function calculateShare(total: number) {
  const t = Number(total ?? 0);
  if (!Number.isFinite(t) || t < 0) {
    throw new Error('total must be a non-negative number');
  }
  // Round to 2 decimals
  const user = Math.round((t * 0.8 + Number.EPSILON) * 100) / 100;
  const government = Math.round((t * 0.2 + Number.EPSILON) * 100) / 100;
  return { user, government };
}

export function formatCurrency(n: number) {
  return '£' + n.toFixed(2);
}
