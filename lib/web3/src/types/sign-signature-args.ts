import type { HexString } from '@echo/utils/types/hex-string'

export interface SignSignatureArgs {
  chainId: number
  signature: HexString
}
