import type { ChainName } from '@echo/utils/types/chain-name'

export interface UnformattedWallet {
  readonly address: string
  readonly chain: ChainName
}
