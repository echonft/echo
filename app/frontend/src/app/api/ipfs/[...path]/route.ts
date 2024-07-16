import { ipfsRequestHandler } from '@echo/frontend/lib/request-handlers/ipfs/ipfs-request-handler'
import { requestHandler } from '@echo/frontend/lib/request-handlers/request-handler'

export const GET = requestHandler(ipfsRequestHandler)
