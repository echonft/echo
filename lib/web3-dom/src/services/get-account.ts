import type { Chain } from '@echo/model/constants/chain'
import { chainById } from '@echo/model/helpers/chain/chain-by-id'
import type { EvmAddress } from '@echo/model/types/address'
import type { ChainId } from '@echo/model/types/chain'
import type { Nullable } from '@echo/utils/types/nullable'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { type Config, wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { isNil, pipe, toLower } from 'ramda'
import {
  getAccount as wagmiGetAccount,
  type GetAccountReturnType,
  watchAccount as wagmiWatchAccount
} from 'wagmi/actions'

export type AccountResult =
  | {
      status: AccountStatus.Connected
      address: EvmAddress
      chain: Chain
    }
  | {
      status: Exclude<AccountStatus, AccountStatus.Connected>
      address: undefined
      chain: undefined
    }

function mapResult(result: GetAccountReturnType): AccountResult {
  function getChain(chainId: Nullable<number>): Nullable<Chain> {
    if (isNil(chainId)) {
      return undefined
    }
    try {
      return chainById(chainId as ChainId)
    } catch (_err) {
      // chain is not supported
      return undefined
    }
  }

  if (result.status === 'connected') {
    const chain = getChain(result.chainId)
    if (isNil(chain)) {
      return {
        address: undefined,
        chain: undefined,
        status: AccountStatus.UnsupportedChain
      }
    }
    return {
      address: toLower(result.address),
      chain,
      status: AccountStatus.Connected
    }
  }

  return {
    address: undefined,
    chain: undefined,
    status: result.status === 'disconnected' ? AccountStatus.Disconnected : AccountStatus.Connecting
  }
}

export function getAccount(): AccountResult {
  return pipe(wagmiGetAccount<Config>, mapResult)(wagmiConfig)
}

export function watchAccount(onChange: (account: AccountResult, prevAccount: AccountResult) => void) {
  wagmiWatchAccount<Config>(wagmiConfig, {
    onChange: (account, prevAccount) => {
      onChange(mapResult(account), mapResult(prevAccount))
    }
  })
}
