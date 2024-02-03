import type { HexString } from '@echo/utils/types/hex-string'
import type { Chain } from '@echo/web3/types/chain'

export interface WalletButtonRenderProps {
  show?: VoidFunction
  hide?: VoidFunction
  chain?: Chain & {
    unsupported?: boolean
  }
  unsupported: boolean
  isConnected: boolean
  isConnecting: boolean
  address?: HexString
  truncatedAddress?: string
  ensName?: string
}
