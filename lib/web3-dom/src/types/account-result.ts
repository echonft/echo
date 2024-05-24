import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { AccountStatus } from '@echo/web3-dom/types/account-status'

export interface AccountResult {
  address: HexString | undefined
  chain: ChainName
  chainId: number
  status: AccountStatus
}
