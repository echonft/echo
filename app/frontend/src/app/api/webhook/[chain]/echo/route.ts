import { requestHandler } from '@echo/backend/request-handlers/request-handler'
import { echoWebhookRequestHandler } from '@echo/backend/request-handlers/webhook/echo-webhook-request-handler'

export const POST = requestHandler(echoWebhookRequestHandler)
