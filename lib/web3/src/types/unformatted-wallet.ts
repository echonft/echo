import type { Chain } from '@echo/utils/constants/chain'

export interface UnformattedWallet {
  readonly address: string
  readonly chain: Chain
}
