import { getQuicknodeSecurityToken } from '@echo/frontend/lib/helpers/webhook/get-quicknode-security-token'
import type { QuicknodeSignatureType } from '@echo/frontend/lib/types/webhook/quicknode-signature-type'
import { createHmac } from 'crypto'

export interface QuicknodeSignatureArgs {
  type: QuicknodeSignatureType
  signature: string
  nonce: string
  contentHash: string
  timestamp: string
}

export async function validateQuicknodeSignature(args: QuicknodeSignatureArgs) {
  const secret = await getQuicknodeSecurityToken(args.type)
  const { signature, nonce, contentHash, timestamp } = args
  const hmac = createHmac('sha256', secret)
  hmac.update(nonce + contentHash + timestamp)
  if (signature !== hmac.digest('base64')) {
    throw Error('invalid Quicknode signature')
  }
}
