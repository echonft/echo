import { z } from 'zod'

export const chainIdSchema = z.number().gt(0)
