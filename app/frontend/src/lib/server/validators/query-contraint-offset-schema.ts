import { z } from 'zod'

export const queryContraintOffsetSchema = z.number().gt(0)
