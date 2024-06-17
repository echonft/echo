import type { WebhookBlockRequest } from '@echo/api/types/requests/webhook-block-request'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { getSignatureHeadersFromRequest } from '@echo/frontend/lib/helpers/webhook/get-signature-headers-from-request'
import { handleNftTransfer } from '@echo/frontend/lib/helpers/webhook/handle-nft-transfer'
import type { RequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/request-handler'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import { transferEventLogSchema } from '@echo/frontend/lib/validators/transfer-event-log-schema'
import { validateQuicknodeSignature } from '@echo/frontend/lib/validators/validate-quicknode-signature'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { NextResponse } from 'next/server'
import { andThen, assoc, invoker, map, objOf, pipe } from 'ramda'

export async function nftTransferWebhookRequestHandler({ req, logger }: RequestHandlerArgs<WebhookBlockRequest>) {
  const signatureValid = await guardAsyncFn({
    fn: pipe(getSignatureHeadersFromRequest, validateQuicknodeSignature),
    status: ErrorStatus.UNAUTHORIZED,
    logger
  })(req)
  if (!signatureValid) {
    // TODO
    return NextResponse.json({})
  }
  // FIXME Should come from the request (different routes for different chains)
  const chain = 'blast_sepolia'
  const transfers = await guardAsyncFn({
    fn: pipe(
      invoker(0, 'json'),
      andThen(pipe(objOf('data'), assoc('chain', chain), (data) => transferEventLogSchema.parse(data)))
    ),
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
    logger
  })(transfers)
  return NextResponse.json({})
}
