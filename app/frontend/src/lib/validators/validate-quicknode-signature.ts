import { getSecret } from '@echo/utils/services/secret-manager'
import { createHmac } from 'crypto'
import { isNil } from 'ramda'

export interface QuicknodeSignatureArgs {
  signature: string
  nonce: string
  contentHash: string
  timestamp: string
}

export async function validateQuicknodeSignature(args: QuicknodeSignatureArgs): Promise<boolean> {
  const secret = await getSecret({ name: 'QUICKNODE_SECURITY_TOKEN' })
  if (isNil(secret)) {
    return false
  }
  const { signature, nonce, contentHash, timestamp } = args

  const hmac = createHmac('sha256', secret)
  hmac.update(nonce + contentHash + timestamp)

  return signature === hmac.digest('base64')
}
