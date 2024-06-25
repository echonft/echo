import type { QuicknodeSignatureType } from '@echo/frontend/lib/types/webhook/quicknode-signature-type'
import { getSecret } from '@echo/utils/services/secret-manager'
import { isNil } from 'ramda'

export async function getQuicknodeSecurityToken(type: QuicknodeSignatureType) {
  if (type === 'nft-transfer') {
    const secret = await getSecret({ name: 'NFT_TRANSFER_QUICKNODE_SECURITY_TOKEN' })
    if (isNil(secret)) {
      throw Error('NFT_TRANSFER_QUICKNODE_SECURITY_TOKEN secret not found')
    }
    return secret
  }
  const secret = await getSecret({ name: 'ECHO_QUICKNODE_SECURITY_TOKEN' })
  if (isNil(secret)) {
    throw Error('ECHO_QUICKNODE_SECURITY_TOKEN secret not found')
  }
  return secret
}
