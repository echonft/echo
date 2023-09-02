import { z } from 'zod'

export const queryContraintLimitSchema = z.number().gt(0)
