import { appRouteHandler } from '@echo/frontend/lib/request-handlers/app-route-handler'
import { getNftRequestHandler } from '@echo/frontend/lib/request-handlers/nft/get-nft-request-handler'

export const GET = appRouteHandler(getNftRequestHandler)
