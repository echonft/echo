import { number } from 'zod'

export const quantitySchema = number().int().positive().readonly()
