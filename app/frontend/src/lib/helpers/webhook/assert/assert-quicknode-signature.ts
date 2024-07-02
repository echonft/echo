import type { ApiRequest } from '@echo/api/types/api-request'
import type { WebhookBlockRequest } from '@echo/api/types/requests/webhook-block-request'
import type { QuicknodeSignatureType } from '@echo/frontend/lib/types/webhook/quicknode-signature-type'
import { getSecret } from '@echo/utils/services/secret-manager'
import type { Secret } from '@echo/utils/types/secret'
import { createHmac } from 'crypto'
import { isNil, objOf, pipe } from 'ramda'

interface AssertQuicknodeSignatureArgs {
  req: ApiRequest<WebhookBlockRequest>
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

export async function assertQuicknodeSignature(args: AssertQuicknodeSignatureArgs): Promise<void> {
  const { req, type } = args
  const signature = req.headers.get('x-qn-signature')
  const nonce = req.headers.get('x-qn-nonce')
  const contentHash = req.headers.get('x-qn-content-hash')
  const timestamp = req.headers.get('x-qn-timestamp')
  if (isNil(signature) || isNil(contentHash) || isNil(nonce) || isNil(timestamp)) {
    return Promise.reject(Error('Quicknode signature not found in headers'))
  }
  const secret = await pipe(getSecretName, objOf('name'), getSecret)(type)
  if (isNil(secret)) {
    return Promise.reject(Error(`secret ${getSecretName(type)} not found`))
  }
  const hmac = createHmac('sha256', secret)
  hmac.update(nonce + contentHash + timestamp)
  if (signature !== hmac.digest('base64')) {
    return Promise.reject(Error('invalid Quicknode signature'))
  }
}
