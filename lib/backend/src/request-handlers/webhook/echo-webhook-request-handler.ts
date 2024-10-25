import { assertQuicknodeSignature } from '@echo/backend/request-handlers/webhook/assert-quicknode-signature'
import { echoEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/echo-event-handler'
import type { RequestHandlerArgsWithParams } from '@echo/backend/types/request-handler'
import type { WebhookBlockRequest } from '@echo/backend/types/webhook-block-request'
import { parseRequest } from '@echo/backend/validators/parse-request'
import type { Chain } from '@echo/model/constants/chain'
import { echoEventSchema } from '@echo/web3/validators/echo-event-schema'
import { NextResponse } from 'next/server'
import { andThen, pipe } from 'ramda'

interface Params {
  chain: Chain
}

export async function echoWebhookRequestHandler({
  params: { chain },
  req
}: RequestHandlerArgsWithParams<Params, WebhookBlockRequest>) {
  const echoEvents = await pipe(assertQuicknodeSignature, andThen(parseRequest(echoEventSchema)))({ req, type: 'echo' })
  for (const event of echoEvents) {
    await echoEventHandler({ event, chain })
  }
  return NextResponse.json({})
}
