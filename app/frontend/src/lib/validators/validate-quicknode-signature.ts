import { getQuicknodeSecurityToken } from '@echo/frontend/lib/helpers/webhook/get-quicknode-security-token'
import type { QuicknodeSignatureType } from '@echo/frontend/lib/types/webhook/quicknode-signature-type'
import { createHmac } from 'crypto'
import { isNil } from 'ramda'

export interface QuicknodeSignatureArgs {
  type: QuicknodeSignatureType
  signature: string
  nonce: string
  contentHash: string
  timestamp: string
}

export async function validateQuicknodeSignature(args: QuicknodeSignatureArgs) {
  const secret = await getQuicknodeSecurityToken(args.type)
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
