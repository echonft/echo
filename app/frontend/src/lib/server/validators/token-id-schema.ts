import { z } from 'zod'

export const tokenIdSchema = z.number().int().positive()
