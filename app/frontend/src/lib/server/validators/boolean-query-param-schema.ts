import { z } from 'zod'

export const booleanQueryParamSchema = z.enum(['true', 'false']).transform((boolString) => {
  if (boolString === 'true') {
    return true
  }
  return false
})
