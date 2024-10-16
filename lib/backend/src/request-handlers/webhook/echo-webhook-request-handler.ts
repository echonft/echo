import { assertQuicknodeSignature } from '@echo/backend/request-handlers/webhook/assert-quicknode-signature'
import { echoEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/echo-event-handler'
import type { RequestHandlerArgsWithParams } from '@echo/backend/types/request-handler'
import type { WebhookBlockRequest } from '@echo/backend/types/webhook-block-request'
import { parseRequest } from '@echo/backend/validators/parse-request'
import type { ChainName } from '@echo/utils/types/chain-name'
import { echoEventLogSchema } from '@echo/web3/validators/echo-event-log-schema'
import { NextResponse } from 'next/server'
import { andThen, pipe } from 'ramda'

export async function echoWebhookRequestHandler({
  params: { chain },
  req,
  logger
}: RequestHandlerArgsWithParams<{ chain: ChainName }, WebhookBlockRequest>) {
  const echoEvents = await pipe(
    assertQuicknodeSignature,
    andThen(parseRequest(echoEventLogSchema))
  )({ req, type: 'echo' })
  for (const event of echoEvents) {
    await echoEventHandler({ event, logger, chain })
  }
  return NextResponse.json({})
}
