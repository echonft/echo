// noinspection JSUnusedGlobalSymbols

import 'ramda'
import type { Awaitable } from '@echo/utils/types/awaitable'
import type { NonEmptyArray } from 'ramda'

declare module 'ramda' {
  export function both<T, RT1 extends T, RT2 extends T>(
    f: (a: T) => a is RT1,
    g: (a: RT1) => a is RT2
  ): (a: T) => a is RT1 & RT2
  export function otherwise<A, B = A>(
    onError: (error: unknown) => Awaitable<B | void>
  ): (promise: Promise<A>) => Promise<B>
  export function otherwise<A, B = A>(onError: (error: unknown) => Awaitable<B | void>, promise: Promise<A>): Promise<B>
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
  export function dissocPath<S, K0 extends keyof S, K1 extends keyof S[K0]>(
    path: [K0, K1]
  ): (obj: S) => Omit<S, K0> & Record<K0, Omit<S[K0], K1>>
  export function take<T>(n: number): (xs: T[]) => NonEmptyArray<T>
  export function reverse(str: string): string
  export function reverse<T extends T[]>(list: T): T
  export function split(sep: string | RegExp): (str: string) => NonEmptyArray<string>
  export function split(sep: string | RegExp, str: string): NonEmptyArray<string>
}

export {}
