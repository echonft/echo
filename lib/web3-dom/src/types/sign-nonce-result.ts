import type { HexString } from '@echo/utils/types/hex-string'

export interface SignNonceResult {
  message: string
  signature: HexString
}
