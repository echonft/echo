import { ipfsRequestHandler } from '@echo/frontend/lib/request-handlers/ipfs/ipfs-request-handler'
import { routeHandler } from '@echo/frontend/lib/request-handlers/route-handler'

export const GET = routeHandler(ipfsRequestHandler)
