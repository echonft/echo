import type { Erc20Token, Erc20TokenBalance } from '@echo/model/types/token'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useAccount } from '@echo/ui/hooks/use-account'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonEmptyArrayMap } from '@echo/utils/fp/non-empty-array-map'
import { supportedErc20Tokens } from '@echo/web3-dom/constants/supported-erc20-tokens'
import { assoc, isNil, type NonEmptyArray, objOf, pipe, prop } from 'ramda'
import useSWR from 'swr'

export function useTokensBalance(): NonEmptyArray<Erc20TokenBalance> {
  const account = useAccount()
  const { getAllTokensBalance, logger } = useDependencies()
  const { data } = useSWR(
    isNil(account.wallet)
      ? undefined
      : {
          name: SWRKeys.contract.getAllTokensBalance,
          wallet: account.wallet,
          tokens: prop(account.wallet.chain, supportedErc20Tokens)
        },
    getAllTokensBalance,
    {
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 500,
      onError: errorCallback({
        logger,
        loggerContext: { component: useTokensBalance.name, fetcher: getAllTokensBalance.name }
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
          contract: { address: '0x0000000000000000000000000000000000000000', chain: 'blast' },
          name: 'WETH',
          decimals: 18,
          type: 'erc20'
        },
        balance: 0
      }
    ]
  }
  if (isNilOrEmpty(data)) {
    return pipe<[typeof supportedErc20Tokens], NonEmptyArray<Erc20Token>, NonEmptyArray<Erc20TokenBalance>>(
      prop(account.wallet.chain),
      nonEmptyArrayMap(pipe(objOf('token'), assoc('balance', 0)))
    )(supportedErc20Tokens)
  }
  return data
}
