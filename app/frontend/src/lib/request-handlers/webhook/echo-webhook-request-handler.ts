import type { WebhookBlockRequest } from '@echo/api/types/requests/webhook-block-request'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { createError } from '@echo/frontend/lib/helpers/error/create-error'
import { assertQuicknodeSignature } from '@echo/frontend/lib/helpers/webhook/assert/assert-quicknode-signature'
import { processEchoEvent } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import type { RequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { echoEventLogSchema } from '@echo/frontend/lib/validators/echo-event-log-schema'
import { parseRequest } from '@echo/frontend/lib/validators/parse-request'
import type { ChainName } from '@echo/utils/types/chain-name'
import { NextResponse } from 'next/server'
import { otherwise, pipe } from 'ramda'

export async function echoWebhookRequestHandler({
  params: { chain },
  req,
  logger
}: RequestHandlerArgsWithParams<{ chain: ChainName }, WebhookBlockRequest>) {
  await pipe(
    assertQuicknodeSignature,
    otherwise((err) => {
      throw createError(ErrorStatus.UNAUTHORIZED, err)
    })
  )({ req, type: 'echo' })
  const echoEvents = await pipe(
    parseRequest(echoEventLogSchema),
    otherwise((err) => {
      throw createError(ErrorStatus.BAD_REQUEST, err)
    })
  )(req)
  for (const event of echoEvents) {
    await processEchoEvent({ event, logger, chain })
  }
  return NextResponse.json({})
}
