import { getSecret } from '@echo/utils/services/secret-manager'
import { createHmac } from 'crypto'
import { isNil } from 'ramda'

export interface QuicknodeSignatureArgs {
  signature: string
  nonce: string
  contentHash: string
  timestamp: string
}

export async function validateQuicknodeSignature(args: QuicknodeSignatureArgs) {
  const secret = await getSecret({ name: 'QUICKNODE_SECURITY_TOKEN' })
  if (isNil(secret)) {
    throw Error('QUICKNODE_SECURITY_TOKEN secret not found')
  }
  const { signature, nonce, contentHash, timestamp } = args
  const hmac = createHmac('sha256', secret)
  hmac.update(nonce + contentHash + timestamp)
  if (signature !== hmac.digest('base64')) {
    throw Error('invalid Quicknode signature')
  }
}
