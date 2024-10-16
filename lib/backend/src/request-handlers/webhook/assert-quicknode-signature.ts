import { ServerError } from '@echo/backend/errors/server-error'
import { UnauthorizedError } from '@echo/backend/errors/unauthorized-error'
import type { NextRequest } from '@echo/backend/types/next-request'
import type { QuicknodeSignatureType } from '@echo/backend/types/quicknode-signature-type'
import type { WebhookBlockRequest } from '@echo/backend/types/webhook-block-request'
import { getSecret } from '@echo/utils/services/secret-manager'
import type { Secret } from '@echo/utils/types/secret'
import { createHmac } from 'crypto'
import { isNil, objOf, pipe } from 'ramda'

interface AssertQuicknodeSignatureArgs {
  req: NextRequest<WebhookBlockRequest>
  type: QuicknodeSignatureType
}

function getSecretName(type: QuicknodeSignatureType): Secret {
  switch (type) {
    case 'echo':
      return 'ECHO_QUICKNODE_SECURITY_TOKEN'
    case 'nft-transfer':
      return 'NFT_TRANSFER_QUICKNODE_SECURITY_TOKEN'
  }
}

export async function assertQuicknodeSignature(
  args: AssertQuicknodeSignatureArgs
): Promise<NextRequest<WebhookBlockRequest>> {
  const { req, type } = args
  const signature = req.headers.get('x-qn-signature')
  const nonce = req.headers.get('x-qn-nonce')
  const contentHash = req.headers.get('x-qn-content-hash')
  const timestamp = req.headers.get('x-qn-timestamp')
  if (isNil(signature) || isNil(contentHash) || isNil(nonce) || isNil(timestamp)) {
    return Promise.reject(new UnauthorizedError({ message: 'Quicknode signature not found in headers' }))
  }
  const secret = await pipe(getSecretName, objOf('name'), getSecret)(type)
  if (isNil(secret)) {
    return Promise.reject(new ServerError({ message: `secret ${getSecretName(type)} not found` }))
  }
  const hmac = createHmac('sha256', secret)
  hmac.update(nonce + contentHash + timestamp)
  if (signature !== hmac.digest('base64')) {
    return Promise.reject(new UnauthorizedError({ message: 'invalid Quicknode signature' }))
  }
  return req
}
