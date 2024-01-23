import { z } from 'zod'

export function getStateQueryParamSchema<T extends readonly [string, ...string[]]>(values: T) {
  return z.enum(values).array().min(1)
}
