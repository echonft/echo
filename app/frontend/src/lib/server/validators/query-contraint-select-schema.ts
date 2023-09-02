import { z } from 'zod'

export const queryContraintSelectSchema = z.string().nonempty().array().nonempty()
