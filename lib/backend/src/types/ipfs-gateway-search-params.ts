import type { ipfsGatewaySearchParamsSchema } from '@echo/backend/validators/ipfs-gateway-search-params-schema'
import { z } from 'zod'

export type IpfsGatewaySearchParams = z.infer<typeof ipfsGatewaySearchParamsSchema>
