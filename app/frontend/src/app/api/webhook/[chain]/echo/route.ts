import { routeHandler } from '@echo/frontend/lib/request-handlers/route-handler'
import { echoWebhookRequestHandler } from '@echo/frontend/lib/request-handlers/webhook/echo-webhook-request-handler'

export const POST = routeHandler(echoWebhookRequestHandler)
