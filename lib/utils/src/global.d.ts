import type { Awaitable } from '@echo/utils/types/awaitable'
import 'ramda'
import type { NonEmptyArray } from 'ramda'

declare module 'ramda' {
  export function otherwise<T>(onError: (error: unknown) => Awaitable<T | void>): <T>(promise: Promise<T>) => Promise<T>
  export function otherwise<T>(onError: (error: unknown) => Awaitable<T | void>, promise: Promise<T>): Promise<T>
  export function path<S, K0 extends keyof S, K1 extends keyof S[K0]>(path: [K0, K1]): (obj: S) => S[K0][K1]
  export function path<S, K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1]>(
    path: [K0, K1, K2]
  ): (obj: S) => S[K0][K1][K2]
  export function path<
    S,
    K0 extends keyof S,
    K1 extends keyof S[K0],
    K2 extends keyof S[K0][K1],
    K3 extends keyof S[K0][K1][K2]
  >(path: [K0, K1, K2, K3]): (obj: S) => S[K0][K1][K2][K3]
  export function path<
    S,
    K0 extends keyof S,
    K1 extends keyof S[K0],
    K2 extends keyof S[K0][K1],
    K3 extends keyof S[K0][K1][K2],
    K4 extends keyof S[K0][K1][K2][K3]
  >(path: [K0, K1, K2, K3, K4]): (obj: S) => S[K0][K1][K2][K3][K4]
  export function path<
    S,
    K0 extends keyof S,
    K1 extends keyof S[K0],
    K2 extends keyof S[K0][K1],
    K3 extends keyof S[K0][K1][K2],
    K4 extends keyof S[K0][K1][K2][K3],
    K5 extends keyof S[K0][K1][K2][K3][K4]
  >(path: [K0, K1, K2, K3, K4, K5]): (obj: S) => S[K0][K1][K2][K3][K4][K5]
  export function path<
    S,
    K0 extends keyof S,
    K1 extends keyof S[K0],
    K2 extends keyof S[K0][K1],
    K3 extends keyof S[K0][K1][K2],
    K4 extends keyof S[K0][K1][K2][K3],
    K5 extends keyof S[K0][K1][K2][K3][K4],
    K6 extends keyof S[K0][K1][K2][K3][K4][K5]
  >(path: [K0, K1, K2, K3, K4, K5, K6]): (obj: S) => S[K0][K1][K2][K3][K4][K5][K6]
  export function path<
    S,
    K0 extends keyof S,
    K1 extends keyof S[K0],
    K2 extends keyof S[K0][K1],
    K3 extends keyof S[K0][K1][K2],
    K4 extends keyof S[K0][K1][K2][K3],
    K5 extends keyof S[K0][K1][K2][K3][K4],
    K6 extends keyof S[K0][K1][K2][K3][K4][K5],
    K7 extends keyof S[K0][K1][K2][K3][K4][K5][K6]
  >(path: [K0, K1, K2, K3, K4, K5, K6, K7]): (obj: S) => S[K0][K1][K2][K3][K4][K5][K6][K7]
  export function path<
    S,
    K0 extends keyof S,
    K1 extends keyof S[K0],
    K2 extends keyof S[K0][K1],
    K3 extends keyof S[K0][K1][K2],
    K4 extends keyof S[K0][K1][K2][K3],
    K5 extends keyof S[K0][K1][K2][K3][K4],
    K6 extends keyof S[K0][K1][K2][K3][K4][K5],
    K7 extends keyof S[K0][K1][K2][K3][K4][K5][K6],
    K8 extends keyof S[K0][K1][K2][K3][K4][K5][K6][K7]
  >(path: [K0, K1, K2, K3, K4, K5, K6, K7, K8]): (obj: S) => S[K0][K1][K2][K3][K4][K5][K6][K7][K8]
  export function take<T>(n: number): (xs: T[]) => NonEmptyArray<T>
  export function reverse(str: string): string
  export function reverse<T extends T[]>(list: T): T
}

export {}
