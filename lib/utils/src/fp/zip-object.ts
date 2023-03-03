import { zipObj } from 'ramda'

export const zipObject = <T>(keys: readonly (keyof T)[]) =>
  zipObj(keys as unknown as string[]) as (values: unknown[]) => T
