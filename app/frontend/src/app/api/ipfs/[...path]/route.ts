import { ipfsRequestHandler } from '@echo/backend/request-handlers/ipfs/ipfs-request-handler'
import { requestHandler } from '@echo/backend/request-handlers/request-handler'

export const GET = requestHandler(ipfsRequestHandler)
