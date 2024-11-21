import { IpfsRoute } from '@echo/backend/helpers/ipfs-route'
import type { IpfsGatewayQueryParams } from '@echo/backend/types/ipfs-gateway-query-params'
import type { IpfsGatewaySearchParams } from '@echo/backend/types/ipfs-gateway-search-params'
import { ipfsGatewaySearchParamsSchema } from '@echo/backend/validators/ipfs-gateway-search-params-schema'

export const ipfsGatewayRoute = new IpfsRoute<Record<'path', string>, IpfsGatewayQueryParams, IpfsGatewaySearchParams>(
  '/:path',
  (query) => ipfsGatewaySearchParamsSchema.parse(query)
)
