import {
  assertQuicknodeSignature,
  type AssertQuicknodeSignatureArgs
} from '@echo/backend/request-handlers/webhook/assert-quicknode-signature'
import { echoEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/echo-event-handler'
import type { NextRequest } from '@echo/backend/types/next-request'
import type { RequestHandlerArgs } from '@echo/backend/types/request-handler'
import type { WebhookBlockRequest } from '@echo/backend/types/webhook-block-request'
import { parseRequest } from '@echo/backend/validators/parse-request'
import type { EchoEvent } from '@echo/web3/types/echo-event'
import { echoEventsSchema } from '@echo/web3/validators/echo-event-schema'
import { NextResponse } from 'next/server'
import { andThen, pipe } from 'ramda'

export async function echoWebhookRequestHandler({ req }: RequestHandlerArgs<WebhookBlockRequest>) {
  const echoEvents = await pipe<
    [AssertQuicknodeSignatureArgs],
    Promise<NextRequest<WebhookBlockRequest>>,
    Promise<EchoEvent[]>
  >(
    assertQuicknodeSignature,
    andThen(parseRequest(echoEventsSchema))
  )({ req, type: 'echo' })
  for (const event of echoEvents) {
    await echoEventHandler(event)
  }
  return NextResponse.json({})
}
