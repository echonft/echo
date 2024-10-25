import type { erc1155ItemRequestSchema } from '@echo/api/validators/erc1155-item-request-schema'
import { z } from 'zod'

export type Erc1155ItemRequest = z.infer<typeof erc1155ItemRequestSchema>
