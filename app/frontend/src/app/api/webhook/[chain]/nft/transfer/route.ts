import { requestHandler } from '@echo/frontend/lib/request-handlers/request-handler'
import { nftTransferWebhookRequestHandler } from '@echo/frontend/lib/request-handlers/webhook/nft-transfer-webhook-request-handler'

export const POST = requestHandler(nftTransferWebhookRequestHandler)
