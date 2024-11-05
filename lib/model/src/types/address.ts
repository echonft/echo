import type { addressSchema } from '@echo/model/validators/address-schema'
import { z } from 'zod'

export type Address = z.infer<typeof addressSchema>
