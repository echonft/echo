/* eslint-disable @typescript-eslint/no-explicit-any */
import { converge as convergeRamda } from 'ramda'

export const converge = <Result>(
  converging: (...args: readonly any[]) => any,
  branches: readonly ((...args: readonly any[]) => any)[]
) => convergeRamda(converging, branches) as any as (value: any) => Result
