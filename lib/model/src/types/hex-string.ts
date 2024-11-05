import type { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { z } from 'zod'

export type HexString = z.infer<typeof hexStringSchema>
