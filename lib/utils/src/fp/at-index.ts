export const atIndex =
  <T = unknown>(index: number) =>
  (array: unknown[]) =>
    array[index] as T
