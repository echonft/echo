import type { seiAddressSchema } from '@echo/model/validators/sei-address-schema'
import { z } from 'zod'

export type SeiAddress = z.infer<typeof seiAddressSchema>
