import type { OwnedERC20Token } from '@echo/model/types/owned-erc20-token'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useAccount } from '@echo/ui/hooks/use-account'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { blastSupportedErc20Tokens } from '@echo/web3-dom/constants/supported-erc20-tokens'
import { getSupportedErc20TokensByChain } from '@echo/web3-dom/helpers/get-supported-erc20-tokens-by-chain'
import { assoc, isNil, map, type NonEmptyArray } from 'ramda'
import useSWR from 'swr'

export function useTokensBalance(): NonEmptyArray<OwnedERC20Token> {
  const account = useAccount()
  const { getAllTokensBalance, logger } = useDependencies()
  const { data } = useSWR<OwnedERC20Token[], Error>(
    isNil(account.wallet)
      ? undefined
      : {
          name: SWRKeys.contract.getAllTokensBalance,
          wallet: account.wallet,
          tokens: getSupportedErc20TokensByChain(account.wallet.chain)
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
  if (isNilOrEmpty(data)) {
    return map(assoc('balance', 0), blastSupportedErc20Tokens) as NonEmptyArray<OwnedERC20Token>
  }
  return data as NonEmptyArray<OwnedERC20Token>
}
