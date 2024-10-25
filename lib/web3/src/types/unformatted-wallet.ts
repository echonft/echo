import type { Chain } from '@echo/model/constants/chain'

export interface UnformattedWallet {
  readonly address: string
  readonly chain: Chain
}
