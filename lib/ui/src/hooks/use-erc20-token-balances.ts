import { Chain } from '@echo/model/constants/chain'
import { TokenType } from '@echo/model/constants/token-type'
import type { Erc20Token } from '@echo/model/types/erc20-token'
import type { TokenBalance } from '@echo/model/types/token-balance'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { useAccount } from '@echo/ui/hooks/use-account'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonEmptyMap } from '@echo/utils/fp/non-empty-map'
import { supportedErc20Tokens } from '@echo/web3-dom/constants/supported-erc20-tokens'
import { assoc, isNil, type NonEmptyArray, objOf, pipe, prop } from 'ramda'
import useSWR from 'swr'

export function useErc20TokenBalances(): NonEmptyArray<TokenBalance<Erc20Token>> {
  const account = useAccount()
  const { getAllErc20TokenBalances } = useDependencies()
  const { data } = useSWR(
    isNil(account.wallet)
      ? undefined
      : {
          name: SWRKeys.contract.getAllTokensBalance,
          wallet: account.wallet,
          tokens: prop(account.wallet.chain, supportedErc20Tokens)
        },
    getAllErc20TokenBalances,
    {
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 500,
      onError: errorCallback({
        loggerContext: { component: useErc20TokenBalances.name, fetcher: getAllErc20TokenBalances.name }
      })
    }
  )
  if (isNil(account.wallet)) {
    // Not the best UX as it might not be supported on every chains, but
    // 1) wallet should be connected when calling this hook
    // 2) lets see what we support and we can reassess after
    // ummmmmmmm FIXME
    return [
      {
        token: {
          contract: { address: '0x0000000000000000000000000000000000000000', chain: Chain.Blast },
          name: 'WETH',
          decimals: 18,
          type: TokenType.Erc20
        },
        balance: 0
      }
    ]
  }
  if (isNilOrEmpty(data)) {
    return pipe<[typeof supportedErc20Tokens], NonEmptyArray<Erc20Token>, NonEmptyArray<TokenBalance<Erc20Token>>>(
      prop(account.wallet.chain),
      nonEmptyMap(pipe(objOf('token'), assoc('balance', 0)))
    )(supportedErc20Tokens)
  }
  return data
}
