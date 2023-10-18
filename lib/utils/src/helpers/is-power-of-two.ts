export function isPowerOfTwo(value: number) {
  return (Math.log(value) / Math.log(2)) % 1 === 0
}
