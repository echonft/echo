import type { Address } from '@echo/model/types/address'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { equals, pipe, toLower } from 'ramda'
import { sei } from 'viem/chains'
import {
  getAccount as wagmiGetAccount,
  type GetAccountReturnType,
  watchAccount as wagmiWatchAccount
} from 'wagmi/actions'

export interface AccountResultConnected {
  status: AccountStatus.Connected
  address: Address
}

export type AccountResult =
  | AccountResultConnected
  | {
      status: Exclude<AccountStatus, AccountStatus.Connected>
      address: undefined
    }

function mapResult(result: GetAccountReturnType): AccountResult {
  if (result.status === 'connected') {
    const { chainId } = result
    if (chainId !== sei.id) {
      return {
        address: undefined,
        status: AccountStatus.UnsupportedChain
      }
    }
    return {
      address: toLower(result.address),
      status: AccountStatus.Connected
    }
  }

  return {
    address: undefined,
    status: result.status === 'disconnected' ? AccountStatus.Disconnected : AccountStatus.Connecting
  }
}

export function getAccount(): AccountResult {
  return pipe(wagmiGetAccount, mapResult)(wagmiConfig)
}

export function watchAccount(onChange: (account: AccountResult, prevAccount: AccountResult) => void) {
  return wagmiWatchAccount(wagmiConfig, {
    onChange: (account, prevAccount) => {
      const mappedAccount = mapResult(account)
      const mappedPrevAccount = mapResult(prevAccount)
      if (!equals(mappedAccount, mappedPrevAccount)) {
        onChange(mappedAccount, mappedPrevAccount)
      }
    }
  })
}
