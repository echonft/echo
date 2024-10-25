import type { erc721ItemRequestSchema } from '@echo/api/validators/erc721-item-request-schema'
import { z } from 'zod'

export type Erc721ItemRequest = z.infer<typeof erc721ItemRequestSchema>
