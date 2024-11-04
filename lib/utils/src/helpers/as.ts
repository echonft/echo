export function as<T, U = unknown>(value: U) {
  return value as unknown as T
}
