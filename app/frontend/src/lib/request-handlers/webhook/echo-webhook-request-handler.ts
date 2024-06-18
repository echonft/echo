import type { WebhookBlockRequest } from '@echo/api/types/requests/webhook-block-request'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { getSignatureHeadersFromRequest } from '@echo/frontend/lib/helpers/webhook/get-signature-headers-from-request'
import { handleNftTransfer } from '@echo/frontend/lib/helpers/webhook/handle-nft-transfer'
import type { RequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/request-handler'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import { transferEventLogSchema } from '@echo/frontend/lib/validators/transfer-event-log-schema'
import { validateQuicknodeSignature } from '@echo/frontend/lib/validators/validate-quicknode-signature'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { NextResponse } from 'next/server'
import { andThen, assoc, invoker, map, objOf, pipe } from 'ramda'

export async function echoWebhookRequestHandler({
  params,
  req,
  logger
}: RequestHandlerArgsWithParams<{ chain: ChainName }, WebhookBlockRequest>) {
  await guardAsyncFn({
    fn: pipe(getSignatureHeadersFromRequest, assoc('type', 'echo'), validateQuicknodeSignature),
    status: ErrorStatus.UNAUTHORIZED,
    logger
  })(req)

  const { chain } = params
  const transfers = await guardAsyncFn({
    fn: pipe(
      invoker(0, 'json'),
      andThen(pipe(objOf('data'), assoc('chain', chain), (data) => transferEventLogSchema.parse(data)))
    ),
    status: ErrorStatus.BAD_REQUEST,
    logger
  })(req)
  await guardAsyncFn({
    fn: pipe(
      map(
        pipe<
          [NftTransfer],
          Record<'transfer', NftTransfer>,
          WithLoggerType<Record<'transfer', NftTransfer>>,
          Promise<void>
        >(objOf('transfer'), assoc('logger', logger), handleNftTransfer)
      ),
      promiseAll
    ),
    status: ErrorStatus.SERVER_ERROR,
    logger
  })(transfers)
  return NextResponse.json({})
}
