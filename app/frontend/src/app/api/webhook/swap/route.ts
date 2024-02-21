import { routeHandler } from '@echo/frontend/lib/request-handlers/route-handler'
import { swapWebhookRequestHandler } from '@echo/frontend/lib/request-handlers/webhook/swap-webhook-request-handler'

export const POST = routeHandler(swapWebhookRequestHandler)
