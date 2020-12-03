/**
 * make range numbers
 *
 * @param {number} start
 * @param {number} end
 * @return {number[]}
 */
export function rangeNumbers(start, end) {
  return Array.from({ length: end - start + 1 }, (x, i) => start + i);
}
