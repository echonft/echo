import { z } from 'zod'

export const queryContraintOrderByDirectionSchema = z.enum(['desc', 'asc']).optional()
