import type { QuicknodeSignatureType } from '@echo/frontend/lib/types/webhook/quicknode-signature-type'
import { getSecret } from '@echo/utils/services/secret-manager'

export async function getQuicknodeSecurityTokenSwitch(type: QuicknodeSignatureType) {
  switch (type) {
    case 'nft-transfer':
      return await getSecret({ name: 'NFT_TRANSFER_QUICKNODE_SECURITY_TOKEN' })
    case 'echo':
      return 'qnsec_Cg5ULEPbQrGuNE-wxxEBJA=='
    // return await getSecret({ name: 'ECHO_QUICKNODE_SECURITY_TOKEN' })
    default:
      throw Error('invalid Quicknode type')
  }
}
