import type { WebhookBlockRequest } from '@echo/api/types/requests/webhook-block-request'
import { assertQuicknodeSignature } from '@echo/frontend/lib/helpers/webhook/assert/assert-quicknode-signature'
import { echoEventHandler } from '@echo/frontend/lib/helpers/webhook/echo-event-handler'
import type { RequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { echoEventLogSchema } from '@echo/frontend/lib/validators/echo-event-log-schema'
import { parseRequest } from '@echo/frontend/lib/validators/parse-request'
import type { ChainName } from '@echo/utils/types/chain-name'
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
