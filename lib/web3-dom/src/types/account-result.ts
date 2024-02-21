import type { HexString } from '@echo/utils/types/hex-string'
import type { AccountStatus } from '@echo/web3-dom/types/account-status'
import type { GetAccountReturnType } from 'wagmi/actions'

export interface AccountResult extends Pick<GetAccountReturnType, 'chain' | 'chainId'> {
  address: Lowercase<HexString> | undefined
  status: AccountStatus
}
