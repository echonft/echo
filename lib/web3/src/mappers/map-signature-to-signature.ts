import type { HexString } from '@echo/utils/types/hex-string'
import type { Signature } from '@echo/web3/types/signature'

export function mapSignatureToSignature(signature: HexString): Signature {
  return { signature }
}
