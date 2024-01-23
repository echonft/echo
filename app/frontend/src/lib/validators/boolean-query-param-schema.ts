import { z } from 'zod'

export const booleanQueryParamSchema = z.enum(['true', 'false']).transform((boolString) => boolString === 'true')
