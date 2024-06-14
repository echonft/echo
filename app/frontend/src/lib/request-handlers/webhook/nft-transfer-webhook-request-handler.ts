import type { ApiRequest } from '@echo/api/types/api-request'
import type { WebhookBlockRequest } from '@echo/api/types/requests/webhook-block-request'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { getSignatureHeadersFromRequest } from '@echo/frontend/lib/helpers/webhook/get-signature-headers-from-request'
import { handleNftTransfer } from '@echo/frontend/lib/helpers/webhook/handle-nft-transfer'
import { transferEventLogSchema } from '@echo/frontend/lib/validators/transfer-event-log-schema'
import { validateQuicknodeSignature } from '@echo/frontend/lib/validators/validate-quicknode-signature'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { NextResponse } from 'next/server'
import { map, pipe } from 'ramda'

export async function nftTransferWebhookRequestHandler(req: ApiRequest<WebhookBlockRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<WebhookBlockRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)

  const signatureValid = await guardAsyncFn(
    pipe(getSignatureHeadersFromRequest, validateQuicknodeSignature),
    ErrorStatus.UNAUTHORIZED
  )(req)
  if (!signatureValid) {
    // TODO
    return NextResponse.json({})
  }
  // FIXME Should come from the request (different routes for different chains)
  const chain = 'blast_sepolia'
  const transfers = guardFn(
    (body) => transferEventLogSchema.parse({ data: body, chain }),
    ErrorStatus.BAD_REQUEST
  )(requestBody)

  await guardAsyncFn(pipe(map(handleNftTransfer), promiseAll), ErrorStatus.BAD_REQUEST)(transfers)

  return NextResponse.json({})
}
