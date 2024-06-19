import type { ApiRequest } from '@echo/api/types/api-request'
import type { WebhookBlockRequest } from '@echo/api/types/requests/webhook-block-request'
import { UnauthorizedError } from '@echo/frontend/lib/helpers/error/unauthorized-error'
import type { QuicknodeSignatureArgs } from '@echo/frontend/lib/validators/validate-quicknode-signature'
import { isNil } from 'ramda'

export function getSignatureHeadersFromRequest(
  req: ApiRequest<WebhookBlockRequest>
): Omit<QuicknodeSignatureArgs, 'type'> {
  const signature = req.headers.get('x-qn-signature')
  const nonce = req.headers.get('x-qn-nonce')
  const contentHash = req.headers.get('x-qn-content-hash')
  const timestamp = req.headers.get('x-qn-timestamp')

  if (isNil(signature) || isNil(contentHash) || isNil(nonce) || isNil(timestamp)) {
    throw new UnauthorizedError()
  }

  return { signature, nonce, contentHash, timestamp }
}
