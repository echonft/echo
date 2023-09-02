import { z } from 'zod'

export const queryContraintLimitToLastSchema = z.number().gt(0)
