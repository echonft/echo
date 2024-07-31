import { noLoggingRequestHandler } from '@echo/frontend/lib/request-handlers/no-logging-request-handler'
import { echoWebhookRequestHandler } from '@echo/frontend/lib/request-handlers/webhook/echo-webhook-request-handler'

export const POST = noLoggingRequestHandler(echoWebhookRequestHandler)
