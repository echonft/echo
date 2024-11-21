import type { ipfsGatewayQueryParamsSchema } from '@echo/backend/validators/ipfs-gateway-query-params-schema'
import { z } from 'zod'

export type IpfsGatewayQueryParams = z.infer<typeof ipfsGatewayQueryParamsSchema>
