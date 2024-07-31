import { noLoggingRequestHandler } from '@echo/frontend/lib/request-handlers/no-logging-request-handler'
import { nftTransferWebhookRequestHandler } from '@echo/frontend/lib/request-handlers/webhook/nft-transfer-webhook-request-handler'

export const POST = noLoggingRequestHandler(nftTransferWebhookRequestHandler)
