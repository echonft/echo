import type { Chain } from '@echo/model/constants/chain'
import { chainById } from '@echo/model/helpers/chain/chain-by-id'
import type { Address } from '@echo/model/types/address'
import type { ChainId } from '@echo/model/types/chain'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { always, applySpec, ifElse, isNil, pipe, prop, propEq, toLower } from 'ramda'
import { getAccount as wagmiGetAccount, type GetAccountReturnType, watchAccount } from 'wagmi/actions'

export interface AccountResult {
  address: Nullable<Address>
  chain: Nullable<Chain>
  status: AccountStatus
}

export function mapResult(result: GetAccountReturnType): AccountResult {
  function getChain(result: GetAccountReturnType): Nullable<Chain> {
    const chainId = result.chainId
    try {
      return chainById(chainId as ChainId)
    } catch (_err) {
      // chain is not supported
      return undefined
    }
  }

  return applySpec<AccountResult>({
    address: pipe(prop('address'), unlessNil(toLower)),
    chain: getChain,
    status: ifElse(propEq('reconnecting', 'status'), always(AccountStatus.Connecting), prop('status'))
  })(result)
}

export interface AccountProviderResult {
  account: AccountResult
  unsubscribe: () => void
}

export function getAccount(onChange?: (account: AccountResult) => void): AccountProviderResult {
  const account = pipe(wagmiGetAccount, mapResult)(wagmiConfig)
  if (isNil(onChange)) {
    return {
      account,
      unsubscribe: () => {
        // nothing to do
      }
    }
  }
  const unsubscribe = watchAccount(wagmiConfig, {
    onChange: (account: GetAccountReturnType, _prevAccount: GetAccountReturnType) => {
      pipe(mapResult, onChange)(account)
    }
  })
  onChange(account)
  return { account, unsubscribe }
}
export type AccountProvider = (onChange?: (account: AccountResult) => void) => AccountProviderResult
