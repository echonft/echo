import { split } from 'ramda'
import { z } from 'zod'

export const queryContraintFieldSchema = z
  .string()
  .nonempty()
  .transform((field: string) => {
    if (field.includes('.')) {
      return split('.', field)
    }
    return field
  })
