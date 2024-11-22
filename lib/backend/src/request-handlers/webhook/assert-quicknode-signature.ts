import { QuickNodeError } from '@echo/backend/constants/errors/quicknode-error'
import type { NextRequest } from '@echo/backend/types/next-request'
import type { QuicknodeSignatureType } from '@echo/backend/types/quicknode-signature-type'
import type { WebhookBlockRequest } from '@echo/backend/types/webhook-block-request'
import { Environment, environment } from '@echo/utils/constants/environment'
import { Secret } from '@echo/utils/constants/secret'
import { getSecret } from '@echo/utils/services/secret-manager'
import { createHmac } from 'crypto'
import { isNil, pipe } from 'ramda'

export interface AssertQuicknodeSignatureArgs {
  readonly req: NextRequest<WebhookBlockRequest>
  readonly type: QuicknodeSignatureType
}

function getSecretName(type: QuicknodeSignatureType): Secret {
  switch (type) {
    case 'echo':
      return Secret.EchoQuicknodeSecurityToken
    case 'nft-transfer':
      return Secret.NftTransferQuicknodeSecurityToken
  }
}

export async function assertQuicknodeSignature(
  args: AssertQuicknodeSignatureArgs
): Promise<NextRequest<WebhookBlockRequest>> {
  const { req, type } = args

  if (environment() === Environment.Development) {
    return req
  }

  const signature = req.headers.get('x-qn-signature')
  const nonce = req.headers.get('x-qn-nonce')
  const contentHash = req.headers.get('x-qn-content-hash')
  const timestamp = req.headers.get('x-qn-timestamp')
  if (isNil(signature) || isNil(contentHash) || isNil(nonce) || isNil(timestamp)) {
    return Promise.reject(Error(QuickNodeError.SignatureNotFound))
  }
  const secret = await pipe(getSecretName, getSecret)(type)
  const hmac = createHmac('sha256', secret)
  hmac.update(nonce + contentHash + timestamp)
  if (signature !== hmac.digest('base64')) {
    return Promise.reject(Error(QuickNodeError.SignatureInvalid))
  }
  return req
}
