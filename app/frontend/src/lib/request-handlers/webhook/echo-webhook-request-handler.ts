import type { WebhookBlockRequest } from '@echo/api/types/requests/webhook-block-request'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { getSignatureHeadersFromRequest } from '@echo/frontend/lib/helpers/webhook/get-signature-headers-from-request'
import { processEchoEvent } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import type { RequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/request-handler'
import type { QuicknodeSignatureType } from '@echo/frontend/lib/types/webhook/quicknode-signature-type'
import { echoEventLogSchema } from '@echo/frontend/lib/validators/echo-event-log-schema'
import { validateQuicknodeSignature } from '@echo/frontend/lib/validators/validate-quicknode-signature'
import type { ChainName } from '@echo/utils/types/chain-name'
import { NextResponse } from 'next/server'
import { andThen, assoc, invoker, objOf, pipe } from 'ramda'

export async function echoWebhookRequestHandler({
  params,
  req,
  logger
}: RequestHandlerArgsWithParams<{ chain: ChainName }, WebhookBlockRequest>) {
  await guardAsyncFn({
    fn: pipe(
      getSignatureHeadersFromRequest,
      assoc('type', 'echo' as QuicknodeSignatureType),
      validateQuicknodeSignature
    ),
    status: ErrorStatus.UNAUTHORIZED,
    logger
  })(req)
  const { chain } = params
  const echoEvents = await guardAsyncFn({
    // TODO Should use parseRequest
    fn: pipe(
      invoker(0, 'json'),
      andThen(pipe(objOf('data'), assoc('chain', chain), (data) => echoEventLogSchema.parse(data)))
    ),
    status: ErrorStatus.BAD_REQUEST,
    logger
  })(req)
  for (const event of echoEvents) {
    await processEchoEvent({ event, logger, chain })
  }
  return NextResponse.json({})
}
