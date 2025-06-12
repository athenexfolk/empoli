export function compareField<T>(
  a: T,
  b: T,
  field: keyof T,
  direction: SortDirection,
): number {
  let aValue: unknown = a[field];
  let bValue: unknown = b[field];

  if (aValue == null && bValue == null) return 0;
  if (aValue == null) return direction === 'asc' ? 1 : -1;
  if (bValue == null) return direction === 'asc' ? -1 : 1;

  if (typeof aValue === 'string' && typeof bValue === 'string') {
    aValue = aValue.toLowerCase();
    bValue = bValue.toLowerCase();
    if ((aValue as string) < (bValue as string))
      return direction === 'asc' ? -1 : 1;
    if ((aValue as string) > (bValue as string))
      return direction === 'asc' ? 1 : -1;
    return 0;
  }

  if (typeof aValue === 'number' && typeof bValue === 'number') {
    return direction === 'asc' ? aValue - bValue : bValue - aValue;
  }

  if (
    (aValue != undefined || aValue != null) &&
    (bValue != undefined || bValue != null)
  ) {
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
  }

  if (aValue instanceof Date && bValue instanceof Date) {
    return direction === 'asc'
      ? aValue.getTime() - bValue.getTime()
      : bValue.getTime() - aValue.getTime();
  }

  return 0;
}
