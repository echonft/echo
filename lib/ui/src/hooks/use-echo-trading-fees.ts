import { errorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { ChainName } from '@echo/utils/types/chain-name'
import { formatEther } from '@echo/web3/helpers/format-ether'
import { isNil } from 'ramda'
import useSWR from 'swr'

export function useEchoTradingFees(chain: ChainName): string | undefined {
  const { getEchoTradingFees, logger } = useDependencies()
  const { data } = useSWR<bigint, Error>({ name: SWRKeys.contract.getEchoTradingFees, chain }, getEchoTradingFees, {
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 500,
    onError: errorCallback({
      logger,
      loggerContext: { component: useEchoTradingFees.name, fn: getEchoTradingFees.name }
    })
  })
  if (isNil(data)) {
    return data
  }
  return formatEther(data)
}
