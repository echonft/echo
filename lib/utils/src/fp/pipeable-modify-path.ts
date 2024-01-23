import { modifyPath, partial } from 'ramda'

function internalFn<U, T>(path: unknown[], fn: (value: U) => unknown): (obj: U) => T {
  return partial(modifyPath, [path, fn]) as (obj: U) => T
}

export function pipeableModifyPath<K0 extends keyof U, U, T>(path: [K0], fn: (value: U[K0]) => unknown): (obj: U) => T
export function pipeableModifyPath<K0 extends keyof U, K1 extends keyof U[K0], U, T>(
  path: [K0, K1],
  fn: (value: U[K0][K1]) => unknown
): (obj: U) => T
export function pipeableModifyPath<K0 extends keyof U, K1 extends keyof U[K0], K2 extends keyof U[K0][K1], U, T>(
  path: [K0, K1, K2],
  fn: (value: U[K0][K1][K2]) => unknown
): (obj: U) => T
export function pipeableModifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  K3 extends keyof U[K0][K1][K2],
  U,
  T
>(path: [K0, K1, K2, K3], fn: (value: U[K0][K1][K2][K3]) => unknown): (obj: U) => T
export function pipeableModifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  K3 extends keyof U[K0][K1][K2],
  K4 extends keyof U[K0][K1][K2][K3],
  U,
  T
>(path: [K0, K1, K2, K3, K4], fn: (value: U[K0][K1][K2][K3][K4]) => unknown): (obj: U) => T
export function pipeableModifyPath<U, T>(path: unknown[], fn: (value: U) => unknown): (obj: U) => T {
  return internalFn(path, fn)
}
