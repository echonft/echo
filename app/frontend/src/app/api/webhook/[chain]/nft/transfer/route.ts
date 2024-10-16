import { noLoggingRequestHandler } from '@echo/backend/request-handlers/no-logging-request-handler'
import { nftTransferWebhookRequestHandler } from '@echo/backend/request-handlers/webhook/nft-transfer-webhook-request-handler'

export const POST = noLoggingRequestHandler(nftTransferWebhookRequestHandler)
