/**
 * make range numbers
 *
 * @param {number} start
 * @param {number} end
 * @return {number[]}
 */
export function rangeNumbers(start:number, end:number): number[]
{
  return Array.from(
    { length: end - start + 1 },
    (x, i:number) => start + i
  );
}
