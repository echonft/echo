import { requestHandler } from '@echo/backend/request-handlers/request-handler'
import { nftTransferWebhookRequestHandler } from '@echo/backend/request-handlers/webhook/nft-transfer-webhook-request-handler'

export const POST = requestHandler(nftTransferWebhookRequestHandler)
