import { noLoggingRequestHandler } from '@echo/backend/request-handlers/no-logging-request-handler'
import { echoWebhookRequestHandler } from '@echo/backend/request-handlers/webhook/echo-webhook-request-handler'

export const POST = noLoggingRequestHandler(echoWebhookRequestHandler)
