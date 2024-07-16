import { requestHandler } from '@echo/frontend/lib/request-handlers/request-handler'
import { echoWebhookRequestHandler } from '@echo/frontend/lib/request-handlers/webhook/echo-webhook-request-handler'

export const POST = requestHandler(echoWebhookRequestHandler)
