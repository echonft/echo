import { assertQuicknodeSignature } from '@echo/backend/request-handlers/webhook/assert-quicknode-signature'
import { echoEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/echo-event-handler'
import type { RequestHandlerArgs } from '@echo/backend/types/request-handler'
import type { WebhookBlockRequest } from '@echo/backend/types/webhook-block-request'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { echoEventSchema } from '@echo/web3/validators/echo-event-schema'
import { NextResponse } from 'next/server'
import { andThen, pipe } from 'ramda'

export async function echoWebhookRequestHandler({ req }: RequestHandlerArgs<WebhookBlockRequest>) {
  const echoEvents = await pipe(assertQuicknodeSignature, andThen(parseRequest(echoEventSchema)))({ req, type: 'echo' })
  for (const event of echoEvents) {
    await echoEventHandler(event)
  }
  return NextResponse.json({})
}
