import type { ipfsProxyQueryParamsSchema } from '@echo/routing/validators/api/ipfs-proxy-query-params-schema'
import { z } from 'zod'

export type IpfsProxyQueryParams = z.infer<typeof ipfsProxyQueryParamsSchema>
