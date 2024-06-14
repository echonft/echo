import { routeHandler } from '@echo/frontend/lib/request-handlers/route-handler'
import { nftTransferWebhookRequestHandler } from '@echo/frontend/lib/request-handlers/webhook/nft-transfer-webhook-request-handler'

export const POST = routeHandler(nftTransferWebhookRequestHandler)
