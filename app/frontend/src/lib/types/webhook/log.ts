import type { HexString } from '@echo/utils/types/hex-string'

export interface Log {
  address: HexString
  topics: HexString[]
}
